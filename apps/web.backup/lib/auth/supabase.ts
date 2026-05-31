// Supabase client for Palace OS
// Initializes a single Supabase client for interacting with the Supabase API

import { createClient } from '@supabase/supabase-js';

// Load environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create a single supabase client for the application
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to check if Supabase is configured
export const isSupabaseConfigured = () => {
  return !!supabaseUrl && !!supabaseAnonKey;
};

// Types for our database (to be updated based on actual schema)
export type Database = {
  public: {
    Tables: {
      brands: {
        Row: {
          id: string;
          name: string;
          slug: string;
          primary_color: string;
          secondary_color: string;
          logo: string;
          enabled: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          primary_color: string;
          secondary_color: string;
          logo: string;
          enabled?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          primary_color?: string;
          secondary_color?: string;
          logo?: string;
          enabled?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          user_id: string | null;
          status: OrderStatus;
          total_amount: number;
          items: Json;
          brand: Brand;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          status?: OrderStatus;
          total_amount: number;
          items: Json;
          brand: Brand;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          status?: OrderStatus;
          total_amount?: number;
          items?: Json;
          brand?: Brand;
          created_at?: string;
          updated_at?: string;
        };
      };
      // Additional tables will be added as we implement features
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
};

// Add enum types
type OrderStatus = 'confirmed' | 'preparing' | 'ready' | 'completed' | 'cancelled';
type Brand = 'bukka' | 'palace';
type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type SupabaseClient = ReturnType<typeof createClient>;
