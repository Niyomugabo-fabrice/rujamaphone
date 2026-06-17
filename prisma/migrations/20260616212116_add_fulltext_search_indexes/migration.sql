-- Enable pg_trgm extension for trigram matching (fuzzy search)
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Create GIN trigram indexes for fuzzy matching on name fields
CREATE INDEX IF NOT EXISTS idx_smartphone_name_trgm ON "Smartphone" USING gin (name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_speaker_name_trgm ON "Speaker" USING gin (name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_accessory_name_trgm ON "Accessory" USING gin (name gin_trgm_ops);

-- Create GIN trigram indexes for fuzzy matching on description fields
CREATE INDEX IF NOT EXISTS idx_smartphone_description_trgm ON "Smartphone" USING gin (description gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_speaker_description_trgm ON "Speaker" USING gin (description gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_accessory_description_trgm ON "Accessory" USING gin (description gin_trgm_ops);

-- Create GIN trigram indexes for fuzzy matching on brand fields
CREATE INDEX IF NOT EXISTS idx_smartphone_brand_trgm ON "Smartphone" USING gin (brand gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_speaker_brand_trgm ON "Speaker" USING gin (brand gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_accessory_brand_trgm ON "Accessory" USING gin (brand gin_trgm_ops);

-- Add full-text search columns using tsvector
ALTER TABLE "Smartphone" ADD COLUMN IF NOT EXISTS search_vector tsvector;
ALTER TABLE "Speaker" ADD COLUMN IF NOT EXISTS search_vector tsvector;
ALTER TABLE "Accessory" ADD COLUMN IF NOT EXISTS search_vector tsvector;

-- Create GIN indexes for full-text search
CREATE INDEX IF NOT EXISTS idx_smartphone_search_vector ON "Smartphone" USING gin (search_vector);
CREATE INDEX IF NOT EXISTS idx_speaker_search_vector ON "Speaker" USING gin (search_vector);
CREATE INDEX IF NOT EXISTS idx_accessory_search_vector ON "Accessory" USING gin (search_vector);

-- Create trigger functions to update search_vector
CREATE OR REPLACE FUNCTION smartphon_search_vector_update() RETURNS trigger AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('english', coalesce(NEW.name, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(NEW.description, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(NEW.brand, '')), 'C');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION speaker_search_vector_update() RETURNS trigger AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('english', coalesce(NEW.name, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(NEW.description, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(NEW.brand, '')), 'C');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION accessory_search_vector_update() RETURNS trigger AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('english', coalesce(NEW.name, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(NEW.description, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(NEW.brand, '')), 'C');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to automatically update search_vector
DROP TRIGGER IF EXISTS smartphon_search_vector_trigger ON "Smartphone";
CREATE TRIGGER smartphon_search_vector_trigger
  BEFORE INSERT OR UPDATE ON "Smartphone"
  FOR EACH ROW
  EXECUTE FUNCTION smartphon_search_vector_update();

DROP TRIGGER IF EXISTS speaker_search_vector_trigger ON "Speaker";
CREATE TRIGGER speaker_search_vector_trigger
  BEFORE INSERT OR UPDATE ON "Speaker"
  FOR EACH ROW
  EXECUTE FUNCTION speaker_search_vector_update();

DROP TRIGGER IF EXISTS accessory_search_vector_trigger ON "Accessory";
CREATE TRIGGER accessory_search_vector_trigger
  BEFORE INSERT OR UPDATE ON "Accessory"
  FOR EACH ROW
  EXECUTE FUNCTION accessory_search_vector_update();

-- Update existing records
UPDATE "Smartphone" SET search_vector =
  setweight(to_tsvector('english', coalesce(name, '')), 'A') ||
  setweight(to_tsvector('english', coalesce(description, '')), 'B') ||
  setweight(to_tsvector('english', coalesce(brand, '')), 'C');

UPDATE "Speaker" SET search_vector =
  setweight(to_tsvector('english', coalesce(name, '')), 'A') ||
  setweight(to_tsvector('english', coalesce(description, '')), 'B') ||
  setweight(to_tsvector('english', coalesce(brand, '')), 'C');

UPDATE "Accessory" SET search_vector =
  setweight(to_tsvector('english', coalesce(name, '')), 'A') ||
  setweight(to_tsvector('english', coalesce(description, '')), 'B') ||
  setweight(to_tsvector('english', coalesce(brand, '')), 'C');