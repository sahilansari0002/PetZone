/*
  # Fix user profiles RLS policies

  1. Changes
    - Add INSERT policy for user_profiles table
    - Ensure users can only insert their own profile

  2. Security
    - Maintain existing SELECT and UPDATE policies
    - Add new INSERT policy with proper checks
*/

-- Add INSERT policy for user profiles
CREATE POLICY "Users can insert own profile"
  ON user_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);