-- Create shared carts table for group ordering functionality
CREATE TABLE IF NOT EXISTS public.shared_carts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  brand VARCHAR(20) NOT NULL CHECK (brand IN ('bukka', 'palace')),
  cart_data JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() + INTERVAL '7 days'
);

-- Add indexes for common queries
CREATE INDEX IF NOT EXISTS idx_shared_carts_user_id ON public.shared_carts(user_id);
CREATE INDEX IF NOT EXISTS idx_shared_carts_brand ON public.shared_carts(brand);
CREATE INDEX IF NOT EXISTS idx_shared_carts_created_at ON public.shared_carts(created_at);
CREATE INDEX IF NOT EXISTS idx_shared_carts_expires_at ON public.shared_carts(expires_at);

-- Enable row level security
ALTER TABLE public.shared_carts ENABLE ROW LEVEL SECURITY;

-- Create policies for shared carts
-- Anyone can view a shared cart by ID (no authentication required)
CREATE POLICY "Anyone can view shared carts"
  ON public.shared_carts
  FOR SELECT
  USING (true);

-- Only authenticated users can create shared carts
CREATE POLICY "Authenticated users can create shared carts"
  ON public.shared_carts
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Users can update their own shared carts
CREATE POLICY "Users can update their own shared carts"
  ON public.shared_carts
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete their own shared carts
CREATE POLICY "Users can delete their own shared carts"
  ON public.shared_carts
  FOR DELETE
  USING (auth.uid() = user_id);