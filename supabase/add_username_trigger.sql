-- Migration: Add username auto-population trigger
-- Run this if you already have the profiles table

-- Drop existing trigger and function if they exist
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Function to automatically create a profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, username, full_name, email, company, bio, website, avatar_url, cover_url, theme)
  VALUES (
    new.id,
    split_part(new.email, '@', 1), -- Use email prefix as username
    COALESCE(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    new.email,
    'Shapes',
    'Wearable Science',
    'https://get-shapes.com',
    '/images/ShapesBL150.png',
    '/images/White.png',
    '{"primaryColor": "#000000", "backgroundColor": "#000000", "cardStyle": "glass"}'::jsonb
  );
  RETURN new;
END;
$$;

-- Trigger the function every time a user is created
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- If you have an existing profile without a username, update it manually:
-- UPDATE profiles SET username = split_part(email, '@', 1) WHERE username IS NULL;
