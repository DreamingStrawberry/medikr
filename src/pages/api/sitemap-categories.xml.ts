import type { APIRoute } from 'astro';

// 카테고리 인덱스 sitemap (의약품 외 5개 신규 카테고리)
// 데이터 fetch 가 endpoint 정정 후 작동하면 자동 풍부화 가능
export const GET: APIRoute = async ({ site }) => {
  const base = site?.href ?? 'https://medikr.kr/';
  const urls = ['화장품', '의료기기', '건기식', '한약', '회수'];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${base}${encodeURIComponent(u)}/</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;
  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
