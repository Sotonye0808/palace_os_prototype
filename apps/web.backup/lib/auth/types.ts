import { User } from './hooks/useAuth';

// Extend the User type with profile fields
export type Profile = {
  id: string;
  email: string;
  email_confirmed_at: string | null;
  created_at: string;
  updated_at: string;
  // Profile fields
  first_name: string | null;
  last_name: string | null;
  phone_number: string | null;
  date_of_birth: string | null;
  gender: 'male' | 'female' | 'other' | null;
  avatar_url: string | null;
  // Role-based access control
  role: 'super_admin' | 'bukka_manager' | 'secrets_manager' | 'marketer' | 'user';
  // Preferences
  newsletter_subscription: boolean;
  push_notifications_enabled: boolean;
  email_notifications_enabled: boolean;
  sms_notifications_enabled: boolean;
  favorite_brand: 'bukka' | 'palace' | null;
  dietary_restrictions: string[];
  preferred_payment_method: 'card' | 'bank_transfer' | 'ussd' | null;
  // Address info (could be expanded to full address book)
  default_address: string | null;
  default_city: string | null;
  default_state: string | null;
  default_postal_code: string | null;
  default_country: string | null;
};

// Initial empty profile for form state
export const emptyProfile: Profile = {
  id: '',
  email: '',
  email_confirmed_at: null,
  created_at: '',
  updated_at: '',
  first_name: null,
  last_name: null,
  phone_number: null,
  date_of_birth: null,
  gender: null,
  avatar_url: null,
  role: 'user',
  newsletter_subscription: false,
  push_notifications_enabled: true,
  email_notifications_enabled: true,
  sms_notifications_enabled: true,
  favorite_brand: null,
  dietary_restrictions: [],
  preferred_payment_method: null,
  default_address: null,
  default_city: null,
  default_state: null,
  default_postal_code: null,
  default_country: null,
};