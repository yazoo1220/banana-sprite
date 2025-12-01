<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# 🍌 Banana Sprite Generator

<div align="center">

**🎨 AI-powered pixel art sprite sheet generator**

参照画像から16フレーム（4×4）のピクセルアートスプライトシートを自動生成するアプリケーション

**Generate 16-frame (4×4) pixel art sprite sheets from reference images using AI**

</div>

---

## ✨ Features / 機能

### 🇯🇵 日本語

- 🖼️ **参照画像のアップロード**: キャラクター画像をアップロードして、その特徴を保持したままスプライトを生成
- 🎬 **動きの指定**: テキストで動きを説明するだけで、16フレームのアニメーションを作成
- 🎨 **ピクセルアート生成**: ドット絵スタイルのスプライトシートを自動生成
- 📐 **統一されたフォーマット**: 1:1の正方形、白背景、4×4グリッドで統一
- 🌐 **多言語対応**: 日本語と英語のUIに対応
- 💾 **GIFエクスポート**: 生成したスプライトシートをGIF形式でダウンロード可能

### 🇺🇸 English

- 🖼️ **Reference Image Upload**: Upload a character image and generate sprites while maintaining its characteristics
- 🎬 **Movement Specification**: Simply describe the movement in text to create a 16-frame animation
- 🎨 **Pixel Art Generation**: Automatically generates sprite sheets in dot art style
- 📐 **Unified Format**: Consistent 1:1 square aspect ratio, white background, and 4×4 grid
- 🌐 **Multi-language Support**: UI available in both Japanese and English
- 💾 **GIF Export**: Download generated sprite sheets as GIF files

---

## 🚀 Quick Start / クイックスタート

### 📋 Prerequisites / 必要なもの

- **Node.js** (v18 or higher / v18以上)

### 🔧 Installation / インストール

#### 1️⃣ Install dependencies / 依存関係のインストール

```bash
npm install
```

#### 2️⃣ Set up API Key / APIキーの設定

Create a `.env.local` file in the project root and add your Gemini API key:

プロジェクトルートに `.env.local` ファイルを作成し、Gemini APIキーを追加してください：

```env
GEMINI_API_KEY=your_api_key_here
```

> 💡 **Note / 注意**: You can get your API key from [Google AI Studio](https://ai.google.dev/)  
> APIキーは [Google AI Studio](https://ai.google.dev/) から取得できます

#### 3️⃣ Run the app / アプリの起動

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

アプリは `http://localhost:5173` で利用可能になります

---

## 📖 How to Use / 使い方

### 🇯🇵 日本語

1. **🔑 APIキーの選択**
   - アプリ起動時にAPIキーの選択画面が表示されます
   - または、ヘッダーの「API Key」ボタンから選択できます

2. **📤 画像のアップロード**
   - 「キャラクター画像をアップロード」エリアに画像をドラッグ&ドロップ
   - または、クリックしてファイルを選択

3. **✍️ 動きの説明を入力**
   - 「動きの説明」テキストエリアに、生成したいアニメーションを説明
   - 例：「歩く」「走る」「ジャンプ」「攻撃」など

4. **🎬 生成ボタンをクリック**
   - 「スプライトを生成」ボタンをクリック
   - 生成には数秒〜数十秒かかります

5. **💾 結果のダウンロード**
   - 生成されたスプライトシートが表示されます
   - 「GIFとしてダウンロード」ボタンでGIFファイルを保存できます

### 🇺🇸 English

1. **🔑 Select API Key**
   - The API key selection screen will appear when you start the app
   - Or select from the "API Key" button in the header

2. **📤 Upload Image**
   - Drag & drop an image to the "Upload Character Image" area
   - Or click to select a file

3. **✍️ Enter Movement Description**
   - Enter a description of the animation you want to generate in the "Movement Description" text area
   - Examples: "walking", "running", "jumping", "attacking", etc.

4. **🎬 Click Generate Button**
   - Click the "Generate Sprite" button
   - Generation takes a few seconds to tens of seconds

5. **💾 Download Result**
   - The generated sprite sheet will be displayed
   - You can save it as a GIF file using the "Download as GIF" button

---

## 🛠️ Tech Stack / 技術スタック

- **⚛️ React 19** - UI framework
- **📘 TypeScript** - Type safety
- **⚡ Vite** - Build tool and dev server
- **🤖 Google Gemini API** - AI image generation (Nano Banana Pro / gemini-3-pro-image-preview)
- **🎨 Tailwind CSS** - Styling

---

## 📝 Available Scripts / 利用可能なスクリプト

```bash
# Development server / 開発サーバー
npm run dev

# Build for production / 本番用ビルド
npm run build

# Preview production build / 本番ビルドのプレビュー
npm run preview
```

---

## ⚠️ Important Notes / 重要な注意事項

### 🇯🇵 日本語

- 🎲 **生成結果はランダム**: 同じ入力でも毎回異なる結果が生成される可能性があります
- 🔄 **上書きに注意**: 新しいスプライトを生成すると、前の結果は上書きされます
- 💰 **API使用料**: Gemini APIの使用には料金がかかる場合があります。詳細は[料金ドキュメント](https://ai.google.dev/gemini-api/docs/billing)を確認してください

### 🇺🇸 English

- 🎲 **Results are random**: Even with the same input, different results may be generated each time
- 🔄 **Overwrite warning**: Generating a new sprite will overwrite the previous result
- 💰 **API costs**: Using the Gemini API may incur costs. Please check the [billing documentation](https://ai.google.dev/gemini-api/docs/billing) for details

---

## 🔗 Links / リンク

- **🌐 AI Studio**: [View app in AI Studio](https://ai.studio/apps/drive/1TkfmF1hHG3pnu159tj2a2LGFMHcQaHCx)
- **📚 Google AI Studio**: [Get API Key](https://ai.google.dev/)
- **💳 Billing Docs**: [Gemini API Billing](https://ai.google.dev/gemini-api/docs/billing)

---

## 📄 License / ライセンス

This project is licensed under the **Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)** License.

このプロジェクトは **クリエイティブ・コモンズ 表示-非営利 4.0 国際 (CC BY-NC 4.0)** ライセンスの下で公開されています。

### 📋 What this means / このライセンスの意味

#### ✅ You are free to / 以下のことができます

- **🔄 Share / 共有**: Copy and redistribute the material in any medium or format
  素材を任意の媒体や形式でコピー・再配布できます

- **✏️ Adapt / 改変**: Remix, transform, and build upon the material
  素材をリミックス、変換、改変して、元の素材に基づいた作品を作ることができます

#### ❌ Under the following terms / 以下の条件の下で

- **🚫 NonCommercial / 非営利**: You may not use the material for commercial purposes
  商用目的での利用はできません

- **📝 Attribution / 表示**: You must give appropriate credit, provide a link to the license, and indicate if changes were made
  適切なクレジットを表示し、ライセンスへのリンクを提供し、変更を行った場合はその旨を示す必要があります

### 🔗 License Details / ライセンスの詳細

- **📖 Full License Text**: [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/deed.ja)
- **🌐 English**: [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/)

### 💡 Alternative Option / 代替案

If you want to require that derivative works also use the same license, consider **CC BY-NC-SA 4.0** (ShareAlike) instead.

派生作品にも同じライセンスを適用したい場合は、**CC BY-NC-SA 4.0**（継承）を検討してください。

---

<div align="center">

**🍌 Made with ❤️ using Banana Sprite Generator**

**Version 1.2** | © 2025

</div>
