/*
  # Add adoption applications table

  1. New Tables
    - `adoption_applications`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `pet_id` (uuid, foreign key to pets)
      - `status` (text)
      - `personal_info` (jsonb)
      - `home_info` (jsonb)
      - `experience` (jsonb)
      - `references` (jsonb)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS
    - Add policies for users to manage their applications
    - Add policies for shelter staff to view applications for their pets
*/

-- Create adoption applications table
CREATE TABLE IF NOT EXISTS adoption_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users,
  pet_id uuid NOT NULL REFERENCES pets,
  status text NOT NULL DEFAULT 'pending',
  personal_info jsonb NOT NULL,
  home_info jsonb NOT NULL,
  experience jsonb NOT NULL,
  references jsonb NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE adoption_applications ENABLE ROW LEVEL SECURITY;

-- Create policies for adoption applications
CREATE POLICY "Users can view own applications"
  ON adoption_applications
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own applications"
  ON adoption_applications
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Shelter staff can view applications for their pets"
  ON adoption_applications
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM pets
    WHERE pets.id = adoption_applications.pet_id
    AND pets.shelter_id::text = auth.uid()::text
  ));

-- Create trigger for updated_at
CREATE TRIGGER update_adoption_applications_updated_at
  BEFORE UPDATE ON adoption_applications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();