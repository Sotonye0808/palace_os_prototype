-- Create events table for Palace events
CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  time TIME NOT NULL,
  image VARCHAR(255),
  location VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for common queries
CREATE INDEX IF NOT EXISTS idx_events_date ON public.events(date);
CREATE INDEX IF NOT EXISTS idx_events_is_available ON public.events(is_available);
CREATE INDEX IF NOT EXISTS idx_events_created_at ON public.events(created_at);

-- Enable row level security
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Create policies for events
CREATE POLICY "Anyone can view events"
  ON public.events
  FOR SELECT
  USING (true);

CREATE POLICY "Service role can manage events"
  ON public.events
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Updated at trigger
CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON public.events
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create event ticket types table
CREATE TABLE IF NOT EXISTS public.event_ticket_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  description TEXT,
  available_quantity INTEGER NOT NULL DEFAULT 0,
  max_per_person INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for common queries
CREATE INDEX IF NOT EXISTS idx_event_ticket_types_event_id ON public.event_ticket_types(event_id);
CREATE INDEX IF NOT EXISTS idx_event_ticket_types_available ON public.event_ticket_types(available_quantity);

-- Enable row level security
ALTER TABLE public.event_ticket_types ENABLE ROW LEVEL SECURITY;

-- Create policies for event ticket types
CREATE POLICY "Anyone can view event ticket types"
  ON public.event_ticket_types
  FOR SELECT
  USING (true);

CREATE POLICY "Service role can manage event ticket types"
  ON public.event_ticket_types
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Updated at trigger
CREATE TRIGGER update_event_ticket_types_updated_at
  BEFORE UPDATE ON public.event_ticket_types
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();