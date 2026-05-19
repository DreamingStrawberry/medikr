import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://medikr.kr',
  output: 'static',
  build: {
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
  i18n: {
    defaultLocale: 'ko',
    locales: ['ko'],
  },
});
