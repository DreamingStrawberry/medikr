-- 일별 방문 카운터
CREATE TABLE IF NOT EXISTS visits (
  date TEXT PRIMARY KEY,           -- 'YYYY-MM-DD' (KST)
  count INTEGER NOT NULL DEFAULT 0
);

-- 누적 / 일별 빠른 read 위해 index
CREATE INDEX IF NOT EXISTS idx_visits_date ON visits(date DESC);
