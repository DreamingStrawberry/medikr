import { defineMiddleware } from 'astro:middleware';

// Workers Cache 캐시는 cold-start 시 발생한 500 을 함께 캐싱해 정규 URL 이 지속 500 이 되는
// 문제가 있어 비활성화. drug 페이지 속도(식약처 API ~3-7s)는 D1 캐시로 별도 해결 예정.
export const onRequest = defineMiddleware(async (_context, next) => {
  return next();
});
