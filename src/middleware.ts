import { defineMiddleware } from 'astro:middleware';

// drug 페이지는 매 요청 식약처 API 4개 호출(~3-7s). Pages Functions(SSR)는 기본 캐시 안 됨(DYNAMIC).
// → Workers Cache API(caches.default)로 edge 캐시. 첫 요청만 식약처 API, 이후 HIT(ms).
// 캐시 로직은 전체 try-catch — 캐시가 실패해도 페이지 응답은 정상 진행.
export const onRequest = defineMiddleware(async (context, next) => {
  const path = context.url.pathname;
  if (!path.startsWith('/drug/')) return next();

  try {
    const cache = (globalThis as any).caches?.default as Cache | undefined;
    if (!cache) return next();

    const cacheKey = new Request(new URL(path, context.url.origin).toString(), { method: 'GET' });
    const hit = await cache.match(cacheKey);
    if (hit) return hit;

    const response = await next();
    if (response.status === 200) {
      const runtime = (context.locals as any).runtime;
      const toCache = response.clone();
      if (runtime?.ctx?.waitUntil) {
        runtime.ctx.waitUntil(cache.put(cacheKey, toCache));
      }
    }
    return response;
  } catch {
    // 캐시 실패 → 캐시 없이 정상 렌더
    return next();
  }
});
