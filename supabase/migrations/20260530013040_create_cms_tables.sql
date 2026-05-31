-- Create CMS tables for managing configuration objects
-- These tables store the mutable configuration that drives the metadata-driven architecture

-- Brand configurations table
CREATE TABLE IF NOT EXISTS public.brand_configs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(50) UNIQUE NOT NULL,
  primary_color VARCHAR(7) NOT NULL,
  secondary_color VARCHAR(7) NOT NULL,
  logo TEXT,
  enabled BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Menu configurations table
CREATE TABLE IF NOT EXISTS public.menu_configs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id VARCHAR(50) REFERENCES brand_configs(brand_id) ON DELETE CASCADE,
  categories JSONB NOT NULL DEFAULT '[]'::jsonb,
  featured_items JSONB NOT NULL DEFAULT '[]'::jsonb,
  tax_rate DECIMAL(5,4) DEFAULT 0.075,
  service_charge DECIMAL(5,4) DEFAULT 0.10,
  bundles JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Venue configurations table
CREATE TABLE IF NOT EXISTS public.venue_configs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id VARCHAR(50) REFERENCES brand_configs(brand_id) ON DELETE CASCADE,
  tables JSONB NOT NULL DEFAULT '[]'::jsonb,
  zones JSONB NOT NULL DEFAULT '[]'::jsonb,
  operating_hours JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Loyalty configurations table
CREATE TABLE IF NOT EXISTS public.loyalty_configs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id VARCHAR(50) UNIQUE REFERENCES brand_configs(brand_id) ON DELETE CASCADE,
  tiers JSONB NOT NULL DEFAULT '[]'::jsonb,
  points_per_currency INTEGER DEFAULT 10,
  currency_per_point DECIMAL(4,2) DEFAULT 0.10,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notification configurations table
CREATE TABLE IF NOT EXISTS public.notification_configs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id VARCHAR(50) UNIQUE REFERENCES brand_configs(brand_id) ON DELETE CASCADE,
  email JSONB NOT NULL DEFAULT '{"enabled": true, "from": "notifications@palaceos.com", "templates": {}}'::jsonb,
  sms JSONB NOT NULL DEFAULT '{"enabled": true, "from": "PALACEOS", "templates": {}}'::jsonb,
  push JSONB NOT NULL DEFAULT '{"enabled": true, "vapidKey": ""}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Analytics configurations table
CREATE TABLE IF NOT EXISTS public.analytics_configs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id VARCHAR(50) UNIQUE REFERENCES brand_configs(brand_id) ON DELETE CASCADE,
  enabled BOOLEAN DEFAULT TRUE,
  providers JSONB NOT NULL DEFAULT '{"posthog": {"enabled": false, "apiKey": ""}, "google": {"enabled": false, "measurementId": ""}}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for common queries
CREATE INDEX IF NOT EXISTS idx_brand_configs_brand_id ON public.brand_configs(brand_id);
CREATE INDEX IF NOT EXISTS idx_menu_configs_brand_id ON public.menu_configs(brand_id);
CREATE INDEX IF NOT EXISTS idx_venue_configs_brand_id ON public.venue_configs(brand_id);
CREATE INDEX IF NOT EXISTS idx_loyalty_configs_brand_id ON public.loyalty_configs(brand_id);
CREATE INDEX IF NOT EXISTS idx_notification_configs_brand_id ON public.notification_configs(brand_id);
CREATE INDEX IF NOT EXISTS idx_analytics_configs_brand_id ON public.analytics_configs(brand_id);

-- Enable row level security
ALTER TABLE public.brand_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.venue_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.loyalty_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notification_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_configs ENABLE ROW LEVEL SECURITY;

-- Create policies for brand configs
CREATE POLICY "Admins can manage brand configurations"
  ON public.brand_configs
  FOR ALL
  USING (auth.role() = 'service_role' OR (SELECT role FROM auth.users WHERE id = auth.uid()) = 'admin');

-- Create policies for menu configs
CREATE POLICY "Admins can manage menu configurations"
  ON public.menu_configs
  FOR ALL
  USING (auth.role() = 'service_role' OR (SELECT role FROM auth.users WHERE id = auth.uid()) = 'admin');

-- Create policies for venue configs
CREATE POLICY "Admins can manage venue configurations"
  ON public.venue_configs
  FOR ALL
  USING (auth.role() = 'service_role' OR (SELECT role FROM auth.users WHERE id = auth.uid()) = 'admin');

-- Create policies for loyalty configs
CREATE POLICY "Admins can manage loyalty configurations"
  ON public.loyalty_configs
  FOR ALL
  USING (auth.role() = 'service_role' OR (SELECT role FROM auth.users WHERE id = auth.uid()) = 'admin');

-- Create policies for notification configs
CREATE POLICY "Admins can manage notification configurations"
  ON public.notification_configs
  FOR ALL
  USING (auth.role() = 'service_role' OR (SELECT role FROM auth.users WHERE id = auth.uid()) = 'admin');

-- Create policies for analytics configs
CREATE POLICY "Admins can manage analytics configurations"
  ON public.analytics_configs
  FOR ALL
  USING (auth.role() = 'service_role' OR (SELECT role FROM auth.users WHERE id = auth.uid()) = 'admin');

-- Updated at triggers
CREATE TRIGGER update_brand_configs_updated_at
BEFORE UPDATE ON public.brand_configs
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_menu_configs_updated_at
BEFORE UPDATE ON public.menu_configs
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_venue_configs_updated_at
BEFORE UPDATE ON public.venue_configs
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_loyalty_configs_updated_at
BEFORE UPDATE ON public.loyalty_configs
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_notification_configs_updated_at
BEFORE UPDATE ON public.notification_configs
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_analytics_configs_updated_at
BEFORE UPDATE ON public.analytics_configs
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Insert default brand configurations if they don't exist
INSERT INTO public.brand_configs (brand_id, name, slug, primary_color, secondary_color, logo, enabled)
VALUES 
  ('bukka', 'Folixx Bukka', 'bukka', '#8B4513', '#DEB887', '/logos/bukka.png', true),
  ('palace', 'Secrets Palace', 'palace', '#2F4F4F', '#B0C4DE', '/logos/palace.png', true)
ON CONFLICT (brand_id) DO NOTHING;