-- Drop role/status from users. Admin access is now based on authenticated admin sessions.
DROP INDEX IF EXISTS "User_status_idx";

ALTER TABLE "User"
  DROP COLUMN IF EXISTS "role",
  DROP COLUMN IF EXISTS "status";

DROP TYPE IF EXISTS "UserRole";
DROP TYPE IF EXISTS "UserStatus";

-- Add indexes used by product listing, filtering, and sorting endpoints.
CREATE INDEX IF NOT EXISTS "Smartphone_createdAt_idx" ON "Smartphone"("createdAt");
CREATE INDEX IF NOT EXISTS "Smartphone_brand_price_idx" ON "Smartphone"("brand", "price");

CREATE INDEX IF NOT EXISTS "Speaker_createdAt_idx" ON "Speaker"("createdAt");
CREATE INDEX IF NOT EXISTS "Speaker_brand_price_idx" ON "Speaker"("brand", "price");

CREATE INDEX IF NOT EXISTS "Accessory_createdAt_idx" ON "Accessory"("createdAt");
CREATE INDEX IF NOT EXISTS "Accessory_brand_price_idx" ON "Accessory"("brand", "price");
