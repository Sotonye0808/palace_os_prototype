-- Add role column to profiles table for role-based access control
ALTER TABLE profiles ADD COLUMN role TEXT DEFAULT 'user';

-- Update existing admin users to have appropriate roles (if needed)
-- This would typically be done based on your specific admin identification logic
-- For now, we'll set a default role that can be updated manually or via admin interface

-- Create index on role for faster queries
CREATE INDEX idx_profiles_role ON profiles(role);