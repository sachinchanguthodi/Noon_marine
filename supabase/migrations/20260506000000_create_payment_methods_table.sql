/*
  # Create Payment Methods Table
  Stores crypto wallet and bank account payment options managed by admin.
*/

CREATE TABLE IF NOT EXISTS payment_methods (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL CHECK (type IN ('CRYPTO', 'BANK')),
  name text NOT NULL,
  is_active boolean DEFAULT true,
  sort_order integer DEFAULT 0,

  -- Crypto fields
  network text,
  wallet_address text,
  qr_code_url text,

  -- Bank fields
  bank_name text,
  account_name text,
  account_number text,
  iban text,
  swift_code text,
  routing_number text,
  bank_country text,
  bank_currency text,
  additional_info text,

  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_payment_methods_type ON payment_methods(type);
CREATE INDEX IF NOT EXISTS idx_payment_methods_active ON payment_methods(is_active);

ALTER TABLE payment_methods ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active payment methods"
  ON payment_methods FOR SELECT
  USING (is_active = true);

CREATE POLICY "Service role has full access to payment methods"
  ON payment_methods FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE OR REPLACE FUNCTION update_payment_methods_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_payment_methods_updated_at
  BEFORE UPDATE ON payment_methods
  FOR EACH ROW
  EXECUTE FUNCTION update_payment_methods_updated_at();

-- Seed initial USDT ERC20 method
INSERT INTO payment_methods (type, name, network, wallet_address, qr_code_url, is_active, sort_order)
VALUES (
  'CRYPTO',
  'USDT (ERC20)',
  'Ethereum (ERC20)',
  '0xB36779EdB5cffE2499E2fe7d03B0b307ACA4eac3',
  '/usdt-qr.jpg',
  true,
  1
);
