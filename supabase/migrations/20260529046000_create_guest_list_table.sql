-- Create guest list table for event-specific guest management
CREATE TABLE IF NOT EXISTS public.guest_list (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  guest_name VARCHAR(255) NOT NULL,
  guest_email VARCHAR(255),
  guest_phone VARCHAR(20),
  rsvp_status VARCHAR(20) NOT NULL CHECK (rsvp_status IN ('invited', 'accepted', 'declined', 'pending')) DEFAULT 'invited',
  plus_one BOOLEAN DEFAULT false,
  plus_one_name VARCHAR(255),
  dietary_restrictions TEXT,
  notes TEXT,
  invited_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  invited_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for common queries
CREATE INDEX IF NOT EXISTS idx_guest_list_event_id ON public.guest_list(event_id);
CREATE INDEX IF NOT EXISTS idx_guest_list_user_id ON public.guest_list(user_id);
CREATE INDEX IF NOT EXISTS idx_guest_list_rsvp_status ON public.guest_list(rsvp_status);
CREATE INDEX IF NOT EXISTS idx_guest_list_invited_at ON public.guest_list(invited_at);

-- Enable row level security
ALTER TABLE public.guest_list ENABLE ROW LEVEL SECURITY;

-- Create policies for guest list
CREATE POLICY "Users can view guest list for events they're invited to"
  ON public.guest_list
  FOR SELECT
  USING (
    auth.uid() = user_id OR 
    auth.uid() = invited_by OR
    EXISTS (
      SELECT 1 FROM events 
      WHERE events.id = guest_list.event_id 
      AND EXISTS (
        SELECT 1 FROM guest_list AS inviter 
        WHERE inviter.event_id = events.id 
        AND inviter.user_id = auth.uid()
      )
    )
  );

CREATE POLICY "Users can insert guest list entries for events they manage"
  ON public.guest_list
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM events 
      WHERE events.id = event_id 
      AND EXISTS (
        SELECT 1 FROM guest_list AS inviter 
        WHERE inviter.event_id = events.id 
        AND inviter.user_id = auth.uid()
      )
    ) OR
    auth.uid() = user_id  -- Users can always add themselves
  );

CREATE POLICY "Users can update their own guest list entries"
  ON public.guest_list
  FOR UPDATE
  USING (auth.uid() = user_id OR auth.uid() = invited_by);

CREATE POLICY "Users can delete their own guest list entries"
  ON public.guest_list
  FOR DELETE
  USING (auth.uid() = user_id OR auth.uid() = invited_by);

-- Updated at trigger
CREATE TRIGGER update_guest_list_updated_at
  BEFORE UPDATE ON public.guest_list
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();