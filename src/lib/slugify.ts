// URL slug 변환 — 한글/특수문자 그대로 사용 (Astro 가 자동 URL encode)
// 단, /, ?, # 같은 path delimiter 는 _ 로 치환
export function slugify(s: string): string {
  return s
    .trim()
    .replace(/[\/\?#&]/g, '_')
    .replace(/\s+/g, '-')
    .substring(0, 100);
}
