import type { APIRoute } from 'astro';
import { getDurTaboos } from '../../../lib/mfds';
import { jsonResponse, corsHeaders } from '../../../lib/api-cors';

// SSR endpoint — 매 요청 식약처 API 호출 + 24h 캐시
export const prerender = false;

export const OPTIONS: APIRoute = () => new Response(null, { headers: corsHeaders });

export const GET: APIRoute = async ({ params }) => {
  const taboos = await getDurTaboos(params.itemSeq!).catch(() => []);
  return jsonResponse(
    taboos.map((t) => ({
      seq: t.MIXTURE_ITEM_SEQ ?? '',
      name: t.MIXTURE_ITEM_NAME ?? '',
      reason: t.PROHBT_CONTENT ?? '',
      ingredient: t.MIXTURE_INGR_KOR_NAME ?? '',
    }))
  );
};
