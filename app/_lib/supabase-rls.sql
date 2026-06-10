-- Supabase RLS setup for your current schema
-- Run these in Supabase SQL Editor

-- Enable RLS on the tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Users table policies
CREATE POLICY "Users can view their own profile"
  ON public.users
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Allow public registration profile inserts"
  ON public.users
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can insert their own profile"
  ON public.users
  FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.users
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Contacts table policies
CREATE POLICY "Users can view their own contacts"
  ON public.contacts
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own contacts"
  ON public.contacts
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own contacts"
  ON public.contacts
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own contacts"
  ON public.contacts
  FOR DELETE
  USING (auth.uid() = user_id);

-- Optional: allow the service role to bypass RLS for admin operations
-- (Supabase service role already bypasses RLS, so this is usually not needed.)
