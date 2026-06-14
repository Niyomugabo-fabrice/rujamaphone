-- Create SearchableProducts view for unified search across all product types
CREATE OR REPLACE VIEW "SearchableProducts" AS
SELECT 
  id,
  name,
  price,
  image,
  description,
  rating,
  reviews,
  storage,
  condition,
  brand,
  NULL::text as "batteryLife",
  NULL::text as type,
  'SMARTPHONE' as category,
  createdAt,
  updatedAt
FROM "Smartphone"

UNION ALL

SELECT 
  id,
  name,
  price,
  image,
  description,
  rating,
  reviews,
  NULL::text as storage,
  condition,
  brand,
  "batteryLife",
  NULL::text as type,
  'SPEAKER' as category,
  createdAt,
  updatedAt
FROM "Speaker"

UNION ALL

SELECT 
  id,
  name,
  price,
  image,
  description,
  rating,
  reviews,
  NULL::text as storage,
  condition,
  brand,
  NULL::text as "batteryLife",
  type,
  'ACCESSORY' as category,
  createdAt,
  updatedAt
FROM "Accessory";
