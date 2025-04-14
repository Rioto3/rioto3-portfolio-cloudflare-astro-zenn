// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://rioto3.com', // サイトのURLを指定（本番用に変更が必要）
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [
    sitemap({
      // サイトマップ設定オプション
      filter: (page) => !page.includes('/private/') && !page.includes('/draft/'), // 特定のパスを除外
      changefreq: 'weekly', // デフォルトの頻度
      lastmod: new Date(), // 最終更新日
      serialize(item) {
        // 記事ページには異なる変更頻度を設定
        if (item.url.includes('/articles/')) {
          return {
            ...item,
            changefreq: 'monthly', 
            priority: 0.7
          };
        }
        return item;
      },
    }),
  ],
});
