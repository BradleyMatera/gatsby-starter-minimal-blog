ALTER TABLE orders
  ADD COLUMN IF NOT EXISTS refund_email_sent_at timestamptz;

