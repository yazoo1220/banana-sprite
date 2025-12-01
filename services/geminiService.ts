import { GoogleGenAI } from "@google/genai";

const SYSTEM_PROMPT = `
あなたは「ドット絵スプライトシート専用ジェネレーター」です。

以下のルールを必ず厳守してください：

1. 参照画像（reference image）のキャラクターを忠実に再現し、
   顔、体型、髪型、衣装、色の特徴を一切変えない。

2. 出力は必ず「1:1の正方形」で、「完全な白背景」にすること。

3. 出力は「4×4の16フレームのスプライトシート」であること。
   - グリッドは均等に区切る
   - フレーム番号は 左→右、上→下 の順
   - 16フレームをすべて埋める（空白なし）

4. キャラクターは「右向き（right-facing）」で統一する。

5. スタイルは必ず「ドット絵（pixel art）」。
   ぼかし・高解像度描画は禁止。
   くっきりしたドットで描く。

6. 全フレームで、キャラクターの位置・大きさ・頭身・輪郭の太さを一致させる。
   コマごとの破綻や形崩れは厳禁。

7. 各フレームでは、指定された動きを16分割したアニメーションを作る。
   - 不要な演出・背景・エフェクトは禁止
   - キャラ本体のアニメーションのみ描く

【アニメーション品質の要件】
- 全16フレームは自然で滑らかに連続するアニメーションとして構成する。
- 前後のフレームと滑らかにつながるように中間動作（in-between）を意識する。
- キャラの位置・大きさ・頭の高さ・輪郭の太さを全フレームで完全一致させる。
- ポーズは急激に変えず、動きの軌道（arc）を維持する。
- 動きは「準備 → ピーク → 戻り」の自然な流れを持たせる。
- 連続写真のような自然なモーションを16分割して描く。

以上を完全に守り、スプライト用途に最適化された16フレームの1枚画像を生成してください。
`;

export const generateSprite = async (
  apiKey: string,
  referenceImageBase64: string,
  userPrompt: string
): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey });
  
  // Strip prefix if present for API consumption
  const cleanBase64 = referenceImageBase64.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, '');

  try {
    // Using gemini-3-pro-image-preview as requested for high quality editing/generation
    // "Nano Banana Pro" maps to gemini-3-pro-image-preview in the context of this app's requirements.
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: {
        parts: [
          {
            text: `${SYSTEM_PROMPT}\n\nUser Request (Movement): ${userPrompt}`
          },
          {
            inlineData: {
              mimeType: 'image/png',
              data: cleanBase64
            }
          }
        ]
      },
      config: {
        imageConfig: {
            aspectRatio: "1:1",
            imageSize: "1K" // 1K is standard for sprites
        }
      }
    });

    // Extract image from response
    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.data) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }

    throw new Error("No image generated in the response.");
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};