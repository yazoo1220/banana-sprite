export const DEFAULT_CHARACTER_BASE64 = null;

export interface Preset {
  id: string;
  label: { ja: string; en: string };
  prompt: string;
}

export const PRESETS: Preset[] = [
  {
    id: "walk",
    label: { ja: "歩く (Walking)", en: "Walking" },
    prompt: `🟦 Walking (Right) / 歩く
キャラクターが右向きで自然に歩くモーションを作成してください。

【動きの要件】
- 右足→左足→右足の順に歩行サイクルを行う
- 腕は足と逆方向にスイングする
- 頭と体が歩行リズムに合わせてわずかに上下する
- 全体的にゆっくりした歩行動作にする`
  },
  {
    id: "run",
    label: { ja: "走る (Running)", en: "Running" },
    prompt: `🟦 Running (Right) / 走る
キャラクターが右向きで走るモーションを作成してください。

【動きの要件】
- 歩行よりも大きなストライドで素早く足を入れ替える
- 体は前傾し、全体にスピード感がある
- 腕の振りを強調し、勢いのある走りにする
- 地面を蹴る→浮く→接地 のリズムを繰り返す`
  },
  {
    id: "idle",
    label: { ja: "待機 (Idle)", en: "Idle" },
    prompt: `🟦 Idle / 待機
キャラクターが右向きで立ち、自然に待機するモーションを作成してください。

【動きの要件】
- 呼吸に合わせて胸と肩がわずかに上下する
- 髪や体が微小に揺れる程度の軽い動き
- 全体の姿勢は変えず、柔らかい生命感だけを表現する`
  },
  {
    id: "attack",
    label: { ja: "攻撃 (Attack)", en: "Attack" },
    prompt: `🟦 Attack / 攻撃
キャラクターが右向きで攻撃するモーションを作成してください。

【動きの要件】
- 準備動作（溜め）→攻撃の瞬間→戻り の流れを含める
- 腰をひねり、腕や武器を前方に突き出す
- 不必要なエフェクトは描かず、体の動きのみで攻撃を表現`
  },
  {
    id: "jump",
    label: { ja: "ジャンプ (Jump)", en: "Jump" },
    prompt: `🟦 Jump / ジャンプ
キャラクターが右向きでジャンプするモーションを作成してください。

【動きの要件】
- 踏み切り → 上昇 → 頂点 → 下降 → 着地 の順で動作を構成する
- 重力を感じる自然なジャンプ軌道にする
- 最後は元の立ち姿勢に戻る`
  },
  {
    id: "damage",
    label: { ja: "ダメージ (Damage)", en: "Damage" },
    prompt: `🟦 Damaged / ダメージ
キャラクターが右向きでダメージを受けるモーションを作成してください。

【動きの要件】
- ダメージを受けた瞬間、体が後ろにわずかに反る
- 衝撃波や斬撃などのヒットエフェクトを描画し、痛みを強調する
- 反動で揺れるような動きを入れる
- 最後は構えに戻る`
  },
  {
    id: "magic",
    label: { ja: "魔法詠唱 (Magic)", en: "Magic Cast" },
    prompt: `🟦 Magic Cast / 魔法詠唱
キャラクターが右向きで魔法を詠唱するモーションを作成してください。

【動きの要件】
- 祈るように両手を前に構える、または胸元に寄せる
- 詠唱中は小さな揺れや手の動きを入れる
- 光や炎などの魔法エフェクト（パーティクルやオーラ）を加えて表現する`
  },
  {
    id: "victory",
    label: { ja: "勝利 (Victory)", en: "Victory" },
    prompt: `🟦 Victory / 勝利
キャラクターが右向きで勝利ポーズを取るモーションを作成してください。

【動きの要件】
- 胸を張る、片腕を掲げる、軽く跳ねるなどの勝利アクションを入れる
- 最後は決めポーズで静止させる`
  }
];

export const TRANSLATIONS = {
  ja: {
    subtitle: "Nano Banana Pro搭載 ドット絵ジェネレーター",
    introTitle: "AIで高品質なドット絵素材を作成",
    introText: "手持ちのキャラ画像をアップロードして、動きを選ぶだけ。ゲームや動画で使える「4x4 スプライトシート」をAIが一瞬で生成します。",
    step1: "1. 元画像を選択（必須）",
    step2: "2. 動きの種類を選ぶ",
    placeholder: "作りたい動きの詳細をここに入力...（例: 剣を振る、魔法を唱えるなど）",
    uploadText: "画像をアップロード",
    uploadSubtext: "PNG / JPG / WEBP (自動で正方形に調整されます)",
    refLoaded: "画像をセットしました",
    refProcessed: "AIが認識しやすいよう、自動で白背景・正方形に整形しました。",
    remove: "画像を削除",
    generateBtn: "スプライトを生成する",
    generating: "AIが描画中...",
    timeEst: "処理には10〜20秒ほどかかります",
    results: "完成したスプライト",
    downloadPng: "PNG画像を保存",
    downloadGif: "GIFアニメを保存",
    spriteSheet: "スプライトシート (4x4)",
    preview: "アニメーション確認",
    apiKeyRequired: "Gemini 3 Pro のAPIキーが必要です（有料プラン）",
    selectKey: "APIキーを設定",
    billingDocs: "料金設定について確認する",
    noteGacha: "※ AI生成のため、仕上がりにはばらつき（ガチャ要素）があります。何度か試してみてください。",
    noteOverwrite: "※ 再生成すると現在の結果は上書きされます。必要な画像は先にダウンロードしてください。"
  },
  en: {
    subtitle: "Powered by Gemini Nano Banana Pro",
    introTitle: "Create Professional Sprite Sheets",
    introText: "Upload a character, pick a move, and get a perfectly aligned 4x4 sprite sheet instantly. Optimized for game dev and animation.",
    step1: "1. Character Reference (Required)",
    step2: "2. Select Movement",
    placeholder: "Describe the movement details here...",
    uploadText: "Click to upload or drag & drop",
    uploadSubtext: "PNG, JPG, WEBP (Auto-formatted to 1:1)",
    refLoaded: "Reference Loaded",
    refProcessed: "Image has been automatically processed to a 1:1 square ratio with a white background for optimal generation.",
    remove: "Remove",
    generateBtn: "Generate Sprite Sheet",
    generating: "Generating...",
    timeEst: "Takes about 10-20 seconds",
    results: "Generated Results",
    downloadPng: "Download PNG",
    downloadGif: "Download GIF",
    spriteSheet: "Sprite Sheet (4x4)",
    preview: "Preview",
    apiKeyRequired: "A valid API Key (Gemini 3 Pro) is required.",
    selectKey: "Select API Key",
    billingDocs: "Billing Documentation",
    noteGacha: "* Results may vary due to AI randomness. Try multiple times for best results.",
    noteOverwrite: "* Generating again will overwrite the current result. Please download first if needed."
  }
};