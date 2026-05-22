import type { APIRoute } from 'astro';
import searchIdx from '../../data/search-idx.json';
import { jsonResponse, corsHeaders } from '../../lib/api-cors';

// GET /api/search.json?q=타이레놀&limit=20
// 5만 약 색인에서 약이름/제약사 partial match
type SearchEntry = [string, string, string]; // [seq, name, entp]

export const prerender = false;

export const OPTIONS: APIRoute = () => new Response(null, { headers: corsHeaders });

export const GET: APIRoute = async ({ url }) => {
  const q = (url.searchParams.get('q') ?? '').trim().toLowerCase();
  const limit = Math.min(Number(url.searchParams.get('limit') ?? 20), 100);
  if (q.length < 2) return jsonResponse({ q, results: [], total: 0, error: 'q must be 2+ characters' }, { status: 400 });

  const idx = searchIdx as SearchEntry[];
  const matches: { seq: string; name: string; entp: string }[] = [];
  for (const [seq, name, entp] of idx) {
    if (name.toLowerCase().includes(q) || entp.toLowerCase().includes(q)) {
      matches.push({ seq, name, entp });
      if (matches.length >= limit) break;
    }
  }
  return jsonResponse({ q, total: matches.length, results: matches });
};
