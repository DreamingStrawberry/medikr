import type { APIRoute } from 'astro';
import { prefetchAll } from '../../../lib/mfds';

export async function getStaticPaths() {
  const { drugs } = await prefetchAll();
  return drugs.map((d) => ({ params: { itemSeq: d.itemSeq } }));
}

export const GET: APIRoute = async ({ params }) => {
  const { drugMap, pillMap, permitMap } = await prefetchAll();
  const seq = params.itemSeq!;
  const d = drugMap.get(seq);
  if (!d) return new Response('{}', { status: 404 });
  const p = pillMap.get(seq);
  const pm = permitMap.get(seq);
  const payload = {
    s: d.itemSeq,
    n: d.itemName,
    e: d.entpName,
    efcy: d.efcyQesitm ?? '',
    use: d.useMethodQesitm ?? '',
    atpn: d.atpnQesitm ?? '',
    warn: d.atpnWarnQesitm ?? '',
    intrc: d.intrcQesitm ?? '',
    se: d.seQesitm ?? '',
    deposit: d.depositMethodQesitm ?? '',
    image: d.itemImage || p?.ITEM_IMAGE || '',
    shape: p?.DRUG_SHAPE ?? '',
    color: [p?.COLOR_CLASS1, p?.COLOR_CLASS2].filter(Boolean).join(', '),
    cls: p?.CLASS_NAME ?? '',
    etc: p?.ETC_OTC_NAME ?? '',
    ing: pm?.ITEM_INGR_NAME ?? '',
    permit: pm?.ITEM_PERMIT_DATE ?? '',
  };
  return new Response(JSON.stringify(payload), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
