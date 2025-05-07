/*
  # Add wishlists table if not exists

  1. Changes
    - Create wishlists table if it doesn't exist
    - Add RLS policies if they don't exist
    - Handle cases where table or policies already exist
*/

DO $$ BEGIN
  -- Create table if it doesn't exist
  CREATE TABLE IF NOT EXISTS wishlists (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES auth.users,
    pet_id uuid NOT NULL REFERENCES pets,
    created_at timestamptz DEFAULT now(),
    UNIQUE(user_id, pet_id)
  );

  -- Enable RLS if not already enabled
  ALTER TABLE wishlists ENABLE ROW LEVEL SECURITY;

  -- Drop existing policy if it exists
  DROP POLICY IF EXISTS "Users can manage their own wishlists" ON wishlists;

  -- Create new policy
  CREATE POLICY "Users can manage their own wishlists"
    ON wishlists
    FOR ALL
    TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

EXCEPTION
  WHEN duplicate_table THEN
    NULL;
END $$;