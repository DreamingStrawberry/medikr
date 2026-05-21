import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://medikr.kr',
  output: 'static',
  adapter: cloudflare({
    imageService: 'passthrough',
    platformProxy: { enabled: true },
  }),
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/약/preview'),
    }),
  ],
  build: {
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
  i18n: {
    defaultLocale: 'ko',
    locales: ['ko'],
  },
  vite: {
    define: {
      // 빌드 시 process.env.MFDS_API_KEY 를 실제 값으로 inline
      // (Cloudflare Workers runtime 엔 process 가 없어서 hardcoded 필요)
      'process.env.MFDS_API_KEY': JSON.stringify(process.env.MFDS_API_KEY ?? ''),
    },
    ssr: {
      // src/data/*.json 파일이 SSR 번들에 정상 포함되도록
      noExternal: ['*'],
    },
  },
});
