import type { APIRoute } from 'astro';
import { prefetchAll } from '../../lib/mfds';

// 헤더 자동완성 / 처방분석 / 비교 페이지가 공유하는 검색 인덱스
// 모든 4,757 약 (압축: s/n/e 만)
export const GET: APIRoute = async () => {
  const { drugs } = await prefetchAll();
  const idx = drugs.map((d) => ({ s: d.itemSeq, n: d.itemName, e: d.entpName }));
  return new Response(JSON.stringify(idx), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
