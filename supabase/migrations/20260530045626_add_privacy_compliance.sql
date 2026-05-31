-- Data Privacy Compliance Implementation (NDPR, explicit consent flows)
-- This migration adds tables and columns needed for Nigeria Data Protection Regulation compliance

-- Create table for user consent records
CREATE TABLE IF NOT EXISTS public.privacy_consents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  consent_type VARCHAR(50) NOT NULL, -- e.g., 'marketing', 'analytics', 'data_processing'
  version VARCHAR(20) NOT NULL, -- Version of the privacy policy/terms they agreed to
  granted BOOLEAN NOT NULL DEFAULT FALSE,
  granted_at TIMESTAMP WITH TIME ZONE,
  revoked_at TIMESTAMP WITH TIME ZONE,
  ip_address INET, -- IP address where consent was given
  user_agent TEXT, -- Browser/device information
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for efficient querying
CREATE INDEX IF NOT EXISTS idx_privacy_consents_user_id ON public.privacy_consents(user_id);
CREATE INDEX IF NOT EXISTS idx_privacy_consents_type ON public.privacy_consents(consent_type);
CREATE INDEX IF NOT EXISTS idx_privacy_consents_granted ON public.privacy_consents(granted);

-- Create table for privacy policy versions
CREATE TABLE IF NOT EXISTS public.privacy_policy_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  version VARCHAR(20) NOT NULL UNIQUE,
  title VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,
  effective_date TIMESTAMP WITH TIME ZONE NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for privacy policy versions
CREATE INDEX IF NOT EXISTS idx_privacy_policy_versions_active ON public.privacy_policy_versions(is_active);

-- Add privacy-related fields to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS marketing_consent BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS analytics_consent BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS data_processing_consent BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS last_consent_update TIMESTAMP WITH TIME ZONE;

-- Create trigger to update updated_at column for privacy_consents
CREATE TRIGGER update_privacy_consents_updated_at
BEFORE UPDATE ON public.privacy_consents
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Create trigger to update updated_at column for privacy_policy_versions
CREATE TRIGGER update_privacy_policy_versions_updated_at
BEFORE UPDATE ON public.privacy_policy_versions
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Enable row level security
ALTER TABLE public.privacy_consents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.privacy_policy_versions ENABLE ROW LEVEL SECURITY;

-- Create policies for privacy_consents
CREATE POLICY "Users can manage their own consent records"
  ON public.privacy_consents
  FOR ALL
  USING (auth.uid() = user_id);

-- Create policies for privacy_policy_versions
CREATE POLICY "Anyone can view active privacy policies"
  ON public.privacy_policy_versions
  FOR SELECT
  USING (is_active = TRUE);

CREATE POLICY "Only service role can manage privacy policy versions"
  ON public.privacy_policy_versions
  FOR ALL
  USING (auth.role() = 'service_role');

-- Insert initial privacy policy version
INSERT INTO public.privacy_policy_versions (version, title, content, effective_date, is_active)
VALUES (
  '1.0',
  'Privacy Policy and Data Protection Notice',
  'This Privacy Policy describes how Folixx Palace (\"we\", \"us\", or \"our\") collects, uses, discloses, and safeguards your information when you use our mobile application and website (collectively, the \"Services\"). By accessing or using the Services, you agree to the terms of this Privacy Policy.

DATA COLLECTION
We collect personal information that you voluntarily provide to us when you register for an account, make a purchase, participate in promotional offers, or otherwise interact with the Services. This may include your name, email address, phone number, payment information, and other demographic information.

We also automatically collect certain information when you visit the Services, including your IP address, browser type, operating system, referral URL, and information about your usage of the Services through cookies and similar technologies.

DATA USAGE
We use your personal information to:
- Provide and maintain our Services
- Process transactions and send order confirmations
- Respond to your inquiries and provide customer support
- Send you marketing communications (if you have opted in)
- Improve our Services and develop new features
- Conduct analytics and understand user behavior
- Detect, prevent, and address fraudulent activities
- Comply with legal obligations

DATA SHARING
We may share your information with:
- Service providers who help us operate our business
- Payment processors to facilitate transactions
- Analytics partners to understand usage patterns
- Legal authorities when required by law
- Business partners for joint marketing efforts (only with your explicit consent)

YOUR RIGHTS UNDER NDPR
Under the Nigeria Data Protection Regulation (NDPR), you have the right to:
- Access your personal data that we hold
- Request correction of inaccurate or incomplete data
- Request deletion of your personal data
- Object to or restrict processing of your personal data
- Data portability
- Withdraw consent at any time

To exercise these rights, please contact our Data Protection Officer at privacy@palaceos.com.

COOKIES AND TRACKING
We use cookies and similar tracking technologies to enhance your experience, analyze usage, and for marketing purposes. You can control cookie preferences through your browser settings.

DATA SECURITY
We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, disclosure, alteration, or destruction.

INTERNATIONAL DATA TRANSFERS
Your data may be transferred to and processed in countries other than your own. We ensure adequate protections are in place for such transfers.

CHANGES TO THIS POLICY
We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.

CONTACT US
If you have any questions about this Privacy Policy, please contact us at:
Data Protection Officer
Folixx Palace
privacy@palaceos.com',
  '2026-05-30 00:00:00+00',
  TRUE
);
