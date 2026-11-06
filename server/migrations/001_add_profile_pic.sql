ALTER TABLE users
  ADD COLUMN IF NOT EXISTS profile_pic_url TEXT,
  ADD COLUMN IF NOT EXISTS profile_pic_public_id TEXT;
