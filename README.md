# medikr.kr

식약처 공식 데이터 기반 의약품 정보 검색 사이트.

## 데이터 소스 (식약처 OpenAPI)

| 데이터 | 서비스 | 건수 |
|--------|--------|------|
| e약은요 (효능/부작용/용법) | `DrbEasyDrugInfoService` | 4,757 |
| 의약품 제품 허가정보 | `DrugPrdtPrmsnInfoService07` | 43,240 |
| 의약품 낱알식별 (사진/모양) | `MdcinGrnIdntfcInfoService03` | 25,537 |
| DUR 품목정보 (병용/임부 금기) | `DURPrdlstInfoService03` | 808,026 |

## 스택

- **Astro** (정적 사이트 생성)
- **Cloudflare Pages** (Free, 자동 배포)
- **GitHub Actions** cron (예정 — 매일 06:00 KST 데이터 갱신)
- **TypeScript** strict mode

## 환경변수

```bash
MFDS_API_KEY=...  # 공공데이터포털 일반 인증키
```

GitHub Secrets 와 Cloudflare Pages 환경변수 양쪽에 등록.

## 로컬 개발

```bash
npm install
cp .env.example .env  # MFDS_API_KEY 채우기
npm run dev           # http://localhost:4321
npm run build         # dist/ 정적 빌드
```

## 페이지 구조

| 경로 | 설명 |
|------|------|
| `/` | 홈 (최근 약 + 검색/모양/증상 CTA) |
| `/search` | 클라이언트 검색 (정적 인덱스) |
| `/약/[itemSeq]` | 약 상세 (효능/부작용/금기/사진/광고 3슬롯) |
| `/모양` | 알약 시각 검색 (무한 스크롤) |
| `/증상` | 증상 10종 인덱스 |
| `/증상/[symptom]` | 증상별 약 목록 (효능 키워드 매칭) |
| `/about` | 운영자 정보 |
| `/privacy` | 개인정보처리방침 |
| `/terms` | 이용약관 |
| `/rss.xml` | RSS 2.0 피드 (최근 50종) |
| `/sitemap-index.xml` | 자동 생성 사이트맵 |
| `/robots.txt` | 크롤러 안내 |
| `/ads.txt` | AdSense 검증 (placeholder) |
| `/404` | Not Found |

## 환경변수 (Cloudflare Pages Settings → Variables and Secrets)

| 변수 | 필수 | 용도 |
|------|------|------|
| `MFDS_API_KEY` | ✅ Secret | 식약처 OpenAPI 인증키 (없어도 빌드 통과, 페이지 0개) |
| `PUBLIC_GA4_ID` | 선택 | Google Analytics 4 (예: `G-XXXXXXXXXX`) |
| `PUBLIC_ADSENSE_CLIENT` | 선택 | AdSense (예: `ca-pub-XXXXXXXXXXXXXXXX`) |
| `PUBLIC_GOOGLE_VERIFY` | 선택 | Search Console 검증 메타 토큰 |
| `PUBLIC_NAVER_VERIFY` | 선택 | 네이버 Search Advisor 검증 |

## 디버깅 — 빌드 fail 시

1. **`Unauthorized`**: MFDS_API_KEY 환경변수 누락 또는 잘못된 값 → Cloudflare Pages 설정 재확인
2. **`API not found`**: 엔드포인트 버전이 바뀜 → `src/lib/mfds.ts` 의 v07/v03 수정
3. **빌드 시간 초과**: getStaticPaths 의 페이지 수 줄이기 (현재 500, 5000 시 약 10분)
4. **graceful 처리**: KEY 없을 때 throw 안 함 → 빌드 항상 통과, 단 페이지 0개

## 자동화 (GitHub Actions)

- `.github/workflows/build.yml` — push/PR 시 build + Playwright E2E
- `.github/workflows/cron.yml` — 매일 21:00 UTC (= KST 06:00) 빈 commit 으로 재빌드 트리거

## 라이선스 / 출처

- 사이트 코드: 비공개
- 데이터: 식품의약품안전처 공공데이터 (공공누리 1유형, 상업 이용 가능)

본 사이트는 정보 제공 목적이며, 복용 전 의사·약사 상담을 권장합니다.
