ALTER TABLE orders
  ADD COLUMN IF NOT EXISTS download_links_last_sent_at timestamptz;

