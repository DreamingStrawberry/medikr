import type { APIRoute } from 'astro';
import recentPermits from '../../data/recent-permits.json';
import { jsonResponse, corsHeaders } from '../../lib/api-cors';

// GET /api/recent.json?limit=20
// 최근 허가 의약품 (5만 약 기준 ITEM_PERMIT_DATE desc top 100, 빌드 시 prebuild)
type RecentPermit = { seq: string; name: string; entp: string; date: string };

export const OPTIONS: APIRoute = () => new Response(null, { headers: corsHeaders });

export const GET: APIRoute = async ({ url }) => {
  const limit = Math.min(Number(url.searchParams.get('limit') ?? 20), 100);
  const list = (recentPermits as RecentPermit[]).slice(0, limit);
  return jsonResponse({ total: list.length, results: list });
};
