-- 약 상세 캐시 — 식약처 API(3-7s) 대신 D1 조회(ms)로 drug 페이지 가속.
-- 빌드 시 build-index 가 INSERT OR REPLACE 로 적재 (e약은요 + 낱알 + 허가 통합).
CREATE TABLE IF NOT EXISTS tb_drug_cache (
  item_seq    TEXT PRIMARY KEY,
  item_name   TEXT NOT NULL,
  entp_name   TEXT,
  eng_name    TEXT,
  -- e약은요 (효능 등 텍스트)
  efcy        TEXT,
  use_method  TEXT,
  atpn_warn   TEXT,
  atpn        TEXT,
  intrc       TEXT,
  se          TEXT,
  deposit     TEXT,
  item_image  TEXT,
  -- 낱알식별 (외형)
  shape       TEXT,
  color       TEXT,
  print_mark  TEXT,
  class_name  TEXT,
  otc         TEXT,
  form        TEXT,
  pill_image  TEXT,
  -- 허가 (허가정보)
  permit_date TEXT,
  spclty      TEXT,
  prdct_type  TEXT,
  prmisn_no   TEXT,
  ingr_name   TEXT
);

-- 관련약 조회용 인덱스 (같은 업체 / 같은 분류)
CREATE INDEX IF NOT EXISTS idx_drug_entp  ON tb_drug_cache(entp_name);
CREATE INDEX IF NOT EXISTS idx_drug_class ON tb_drug_cache(class_name);
