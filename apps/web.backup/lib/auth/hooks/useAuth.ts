import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/auth/supabase';
import { useBrand } from '@/src/contexts/BrandContext';
import { Profile } from '@/lib/auth/types';

// Define user type (extended with profile fields)
export type User = {
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
  // Address info
  default_address: string | null;
  default_city: string | null;
  default_state: string | null;
  default_postal_code: string | null;
  default_country: string | null;
};

// Auth state type
export type AuthState = {
  user: User | null;
  loading: boolean;
};

// Custom hook for authentication
export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true
  });
  const { brandId } = useBrand();

  // Fetch profile data from database
  const fetchProfile = useCallback(async (userId: string) => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error && error.code !== 'PGRST116') { // PGRST116 means no rows returned
        throw error;
      }
      
      return profile || null;
    } catch (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
  }, []);

  // Check current session on mount
  useEffect(() => {
    getSession();
    
    // Listen for auth changes
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        // Fetch profile data
        const profile = await fetchProfile(session.user.id);
        
        setAuthState({
          user: {
            id: session.user.id,
            email: session.user.email || '',
            email_confirmed_at: session.user.email_confirmed_at || '',
            created_at: session.user.created_at || '',
            updated_at: session.user.updated_at || '',
            // Merge profile data with auth user data
            ...(profile || {})
          },
          loading: false
        });
      } else {
        setAuthState({
          user: null,
          loading: false
        });
      }
    });
    
    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, [fetchProfile]); // Re-run effect if fetchProfile changes

  // Get current session
  const getSession = useCallback(async () => {
    try {
      const {
        data: { session },
        error
      } = await supabase.auth.getSession();
      
      if (error) throw error;
      
      if (session?.user) {
        // Fetch profile data
        const profile = await fetchProfile(session.user.id);
        
        setAuthState({
          user: {
            id: session.user.id,
            email: session.user.email || '',
            email_confirmed_at: session.user.email_confirmed_at || '',
            created_at: session.user.created_at || '',
            updated_at: session.user.updated_at || '',
            // Merge profile data with auth user data
            ...(profile || {})
          },
          loading: false
        });
      } else {
        setAuthState({
          user: null,
          loading: false
        });
      }
    } catch (error) {
      console.error('Error getting session:', error);
      setAuthState({
        user: null,
        loading: false
      });
    }
  }, [fetchProfile]);

  // Sign in with email and password
  const signIn = useCallback(async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, loading: true }));
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      if (data.user) {
        setAuthState({
          user: {
            id: data.user.id,
            email: data.user.email || '',
            email_confirmed_at: data.user.email_confirmed_at || '',
            created_at: data.user.created_at || '',
            updated_at: data.user.updated_at || ''
          },
          loading: false
        });
      }
    } catch (error) {
      console.error('Error signing in:', error);
      setAuthState(prev => ({ ...prev, loading: false }));
      throw error;
    }
  }, []);

  // Sign up with email and password
  const signUp = useCallback(async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, loading: true }));
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password
      });
      
      if (error) throw error;
      
      if (data.user) {
        setAuthState({
          user: {
            id: data.user.id,
            email: data.user.email || '',
            email_confirmed_at: data.user.email_confirmed_at || '',
            created_at: data.user.created_at || '',
            updated_at: data.user.updated_at || ''
          },
          loading: false
        });
      }
    } catch (error) {
      console.error('Error signing up:', error);
      setAuthState(prev => ({ ...prev, loading: false }));
      throw error;
    }
  }, []);

  // Sign out
  const signOut = useCallback(async () => {
    setAuthState(prev => ({ ...prev, loading: true }));
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setAuthState({
        user: null,
        loading: false
      });
    } catch (error) {
      console.error('Error signing out:', error);
      setAuthState(prev => ({ ...prev, loading: false }));
      throw error;
    }
  }, []);

  // Update user profile
  const updateProfile = useCallback(async (updates: Partial<User>) => {
    setAuthState(prev => ({ ...prev, loading: true }));
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', authState.user?.id);
      
      if (error) throw error;
      
      // Update local state
      if (authState.user) {
        setAuthState({
          user: {
            ...authState.user,
            ...updates
          },
          loading: false
        });
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setAuthState(prev => ({ ...prev, loading: false }));
      throw error;
    }
  }, [authState.user]);

  return {
    ...authState,
    brandId,
    signIn,
    signUp,
    signOut,
    updateProfile,
    refreshSession: getSession
  };
};
