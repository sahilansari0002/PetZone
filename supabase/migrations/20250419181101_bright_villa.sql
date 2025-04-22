/*
  # Create pets and shelters tables

  1. New Tables
    - `pets`
      - `id` (uuid, primary key)
      - `name` (text)
      - `species` (text)
      - `breed` (text)
      - `age` (integer)
      - `size` (text)
      - `gender` (text)
      - `description` (text)
      - `image_url` (text)
      - `health_status` (text)
      - `vaccinated` (boolean)
      - `neutered` (boolean)
      - `microchipped` (boolean)
      - `house_trained` (boolean)
      - `good_with_kids` (boolean)
      - `good_with_dogs` (boolean)
      - `good_with_cats` (boolean)
      - `activity_level` (text)
      - `shelter_id` (uuid, foreign key)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `shelters`
      - `id` (uuid, primary key)
      - `name` (text)
      - `address` (text)
      - `city` (text)
      - `state` (text)
      - `zip_code` (text)
      - `phone_number` (text)
      - `email` (text)
      - `website_url` (text, nullable)
      - `description` (text)
      - `image_url` (text)
      - `latitude` (double precision)
      - `longitude` (double precision)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users to read all data
    - Add policies for shelter staff to manage their own shelter's data
*/

-- Create shelters table
CREATE TABLE IF NOT EXISTS shelters (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  address text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  zip_code text NOT NULL,
  phone_number text NOT NULL,
  email text NOT NULL,
  website_url text,
  description text NOT NULL,
  image_url text NOT NULL,
  latitude double precision NOT NULL,
  longitude double precision NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create pets table
CREATE TABLE IF NOT EXISTS pets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  species text NOT NULL,
  breed text NOT NULL,
  age integer NOT NULL,
  size text NOT NULL,
  gender text NOT NULL,
  description text NOT NULL,
  image_url text NOT NULL,
  health_status text NOT NULL,
  vaccinated boolean NOT NULL DEFAULT false,
  neutered boolean NOT NULL DEFAULT false,
  microchipped boolean NOT NULL DEFAULT false,
  house_trained boolean NOT NULL DEFAULT false,
  good_with_kids boolean NOT NULL DEFAULT false,
  good_with_dogs boolean NOT NULL DEFAULT false,
  good_with_cats boolean NOT NULL DEFAULT false,
  activity_level text NOT NULL,
  shelter_id uuid NOT NULL REFERENCES shelters(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE shelters ENABLE ROW LEVEL SECURITY;
ALTER TABLE pets ENABLE ROW LEVEL SECURITY;

-- Create policies for shelters
CREATE POLICY "Allow public read access to shelters"
  ON shelters
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow shelter staff to update their shelter"
  ON shelters
  FOR UPDATE
  TO authenticated
  USING (auth.uid()::text = id::text)
  WITH CHECK (auth.uid()::text = id::text);

-- Create policies for pets
CREATE POLICY "Allow public read access to pets"
  ON pets
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow shelter staff to manage their pets"
  ON pets
  FOR ALL
  TO authenticated
  USING (auth.uid()::text = shelter_id::text)
  WITH CHECK (auth.uid()::text = shelter_id::text);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_shelters_updated_at
  BEFORE UPDATE ON shelters
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pets_updated_at
  BEFORE UPDATE ON pets
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();