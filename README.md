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

## 라이선스 / 출처

- 사이트 코드: 비공개
- 데이터: 식품의약품안전처 공공데이터 (공공누리 1유형, 상업 이용 가능)

본 사이트는 정보 제공 목적이며, 복용 전 의사·약사 상담을 권장합니다.
