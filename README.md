# Rioto3's Portfolio - Astro + Zenn

![Astro](https://img.shields.io/badge/Astro-5.6.1-orange)
![Cloudflare Pages](https://img.shields.io/badge/Cloudflare_Pages-blue)
![Zenn](https://img.shields.io/badge/Zenn_Integration-0.1.158-blue)

モダンで高速なポートフォリオサイト。AstroフレームワークによるSSGとZennコンテンツの統合により、効率的なコンテンツ管理と優れたパフォーマンスを実現しています。

## 📢 特徴

- **⚡ 高速パフォーマンス**: Astroによる静的サイト生成で、最小限のJSを配信
- **📝 Zenn記事の統合**: Zennで作成した記事を自動的にポートフォリオサイトに表示
- **🎨 レスポンシブデザイン**: スマートフォンからデスクトップまでの全てのデバイスに最適化
- **🚀 Cloudflare Pages**: 高速なCDNとグローバルなエッジネットワークでホスティング
- **🔍 SEO対応**: メタタグ、OGP、サイトマップの最適化
- **🧩 コンポーネントベース**: 保守性が高く、拡張が容易な設計

## 🛠️ 技術スタック

- **[Astro](https://astro.build/)**: 高速なウェブサイト構築のためのフレームワーク
- **[Tailwind CSS](https://tailwindcss.com/)**: ユーティリティファーストなCSSフレームワーク
- **[zenn-markdown-html](https://github.com/zenn-dev/zenn-editor)**: Zennフォーマットのマークダウンをレンダリング
- **[Cloudflare Pages](https://pages.cloudflare.com/)**: 高速で安全なホスティングプラットフォーム

## 📂 プロジェクト構造

```
/
├── public/          # 静的アセット
│   ├── favicons/    # ファビコンセット
│   └── manifest.json
├── src/
│   ├── content/     # コンテンツディレクトリ（記事のキャッシュ）
│   ├── layouts/     # レイアウトコンポーネント
│   ├── pages/       # ルーティング用ページファイル
│   └── styles/      # グローバルスタイル
├── astro.config.mjs # Astro設定ファイル
└── package.json     # 依存関係
```

## 🚀 始め方

### 前提条件

- Node.js 18以上
- npm または yarn

### インストール

```bash
# リポジトリのクローン
git clone https://github.com/Rioto3/rioto3-portfolio-cloudflare-astro-zenn.git
cd rioto3-portfolio-cloudflare-astro-zenn

# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

### ビルドとデプロイ

```bash
# ビルド
npm run build

# プレビュー
npm run preview

# Cloudflare Pagesへのデプロイ（CLI経由）
npx wrangler pages publish dist
```

## 📝 Zenn記事の統合

このポートフォリオサイトの主な特徴は、Zennで書いた記事を自動的に統合できる点です。以下の方法で実現しています：

1. ビルド前に外部のZennコンテンツを取得
2. zenn-markdown-htmlを使用してZennスタイルでレンダリング
3. Zennの埋め込み要素（ツイート、GitHub等）もサポート

### 設定方法

1. `astro.config.mjs`の`site`URLを自分のドメインに更新
2. Zennの記事へのリンクを適切に設定

## 🧩 機能拡張

### 新ページの追加

```astro
---
// src/pages/your-page.astro
import MainLayout from '../layouts/MainLayout.astro';
---

<MainLayout title="Your Page Title">
  <h1>Your New Page</h1>
  <p>Content goes here...</p>
</MainLayout>
```

### カスタムスタイルの追加

Tailwind CSSクラスを活用して、簡単にスタイルをカスタマイズできます。

## 📊 パフォーマンス

- Lighthouse スコア: 95+（パフォーマンス、アクセシビリティ、ベストプラクティス、SEO）
- First Contentful Paint: 0.5s以下
- Time to Interactive: 1.2s以下

## 📄 ライセンス

MIT

## 🙏 謝辞

- [Astro](https://astro.build/)チーム
- [Zenn](https://zenn.dev/)チーム
- [Tailwind CSS](https://tailwindcss.com/)チーム
