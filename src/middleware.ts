import { defineMiddleware } from 'astro:middleware';

// SSR 페이지 마다 D1 visits 카운터 +1
// (정적 페이지에는 적용 안 됨 — middleware 는 SSR 시점만 실행)
export const onRequest = defineMiddleware(async (context, next) => {
  // D1 binding (Cloudflare Pages 환경에서만)
  const env = (context.locals as any).runtime?.env;
  const db = env?.DB as D1Database | undefined;

  // 봇 / asset / API 요청은 카운트 skip (사람 페이지뷰만)
  const path = context.url.pathname;
  const isPageView =
    !path.startsWith('/api/') &&
    !path.startsWith('/_astro/') &&
    !path.match(/\.(json|xml|txt|ico|png|jpg|css|js|svg|webp|woff2?)$/) &&
    !path.match(/^\/(favicon|manifest|robots|ads|sitemap)/);

  if (db && isPageView) {
    // KST 오늘 날짜 (UTC+9)
    const kstNow = new Date(Date.now() + 9 * 60 * 60 * 1000);
    const date = kstNow.toISOString().slice(0, 10);
    // UPSERT — 같은 날짜 row 면 count +1
    db.prepare(
      'INSERT INTO visits (date, count) VALUES (?, 1) ON CONFLICT(date) DO UPDATE SET count = count + 1'
    )
      .bind(date)
      .run()
      .catch(() => {}); // 실패해도 페이지 응답 계속
  }

  return next();
});

// D1Database type (Cloudflare Workers runtime)
interface D1Database {
  prepare(query: string): D1PreparedStatement;
}
interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  run(): Promise<unknown>;
  all(): Promise<{ results: unknown[] }>;
  first(): Promise<unknown>;
}
