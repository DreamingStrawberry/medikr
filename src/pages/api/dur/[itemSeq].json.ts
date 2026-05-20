import type { APIRoute } from 'astro';
import { getDurTaboos, prefetchAll } from '../../../lib/mfds';

export async function getStaticPaths() {
  const { drugs } = await prefetchAll();
  return drugs.map((d) => ({ params: { itemSeq: d.itemSeq } }));
}

export const GET: APIRoute = async ({ params }) => {
  const taboos = await getDurTaboos(params.itemSeq!).catch(() => []);
  return new Response(
    JSON.stringify(
      taboos.map((t) => ({
        seq: t.MIXTURE_ITEM_SEQ ?? '',
        name: t.MIXTURE_ITEM_NAME ?? '',
        reason: t.PROHBT_CONTENT ?? '',
        ingredient: t.MIXTURE_INGR_KOR_NAME ?? '',
      }))
    ),
    {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, max-age=86400',
      },
    }
  );
};
