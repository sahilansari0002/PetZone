/*
  # Add wishlists table

  1. New Tables
    - `wishlists`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `pet_id` (uuid, foreign key to pets)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS
    - Add policies for users to manage their wishlists
*/

CREATE TABLE IF NOT EXISTS wishlists (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users,
  pet_id uuid NOT NULL REFERENCES pets,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, pet_id)
);

-- Enable Row Level Security
ALTER TABLE wishlists ENABLE ROW LEVEL SECURITY;

-- Create policies for wishlists
CREATE POLICY "Users can manage their own wishlists"
  ON wishlists
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);