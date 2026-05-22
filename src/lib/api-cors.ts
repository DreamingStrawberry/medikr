// 모든 API endpoint 에서 공통으로 쓸 CORS + 캐시 헤더
export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Max-Age': '86400',
};

export function jsonResponse(data: unknown, opts: { cache?: number; status?: number } = {}): Response {
  const { cache = 86400, status = 200 } = opts;
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': `public, max-age=300, s-maxage=${cache}, stale-while-revalidate=604800`,
      ...corsHeaders,
    },
  });
}
