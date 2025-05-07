/*
  # Add references column to adoption_applications table

  1. Changes
    - Add references column to adoption_applications table to store reference information
*/

ALTER TABLE adoption_applications
ADD COLUMN reference_info jsonb NOT NULL DEFAULT '{}'::jsonb;