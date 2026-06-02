import type { APIRoute } from 'astro';
import { getDurTaboos } from '../../lib/mfds';
import { jsonResponse, corsHeaders } from '../../lib/api-cors';

// GET /api/dur.json?seq=195700020 — 병용금기(DUR). drug 페이지가 client-side 로 호출
// (식약처 DUR API 가 느려 SSR 을 막지 않도록 분리)
export const prerender = false;

export const OPTIONS: APIRoute = () => new Response(null, { headers: corsHeaders });

export const GET: APIRoute = async ({ url }) => {
  const seq = (url.searchParams.get('seq') ?? '').trim();
  if (!seq) return jsonResponse({ taboos: [], error: 'seq required' }, { status: 400 });
  const taboos = await getDurTaboos(seq).catch(() => []);
  return jsonResponse(
    {
      taboos: taboos.map((t) => ({
        name: t.MIXTURE_ITEM_NAME ?? '',
        content: t.PROHBT_CONTENT ?? '',
      })),
    },
    { cache: 86400 } // 하루 캐시
  );
};
