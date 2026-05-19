import type { APIContext } from 'astro';
import { listEasyDrugs } from '../lib/mfds';

export async function GET(context: APIContext) {
  const site = context.site?.href ?? 'https://medikr.kr/';
  const { items } = await listEasyDrugs(1, 50);

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>medikr — 의약품 정보</title>
    <link>${site}</link>
    <description>식약처 공식 데이터 기반 의약품 정보 검색 — 최근 등록 약품 50종</description>
    <language>ko</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items
  .map(
    (d) => `    <item>
      <title>${escapeXml(d.itemName)}</title>
      <link>${site}약/${d.itemSeq}</link>
      <description>${escapeXml((d.efcyQesitm ?? '').slice(0, 200))}</description>
      <guid isPermaLink="true">${site}약/${d.itemSeq}</guid>
    </item>`
  )
  .join('\n')}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}

function escapeXml(s: string): string {
  return s.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case "'": return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}
