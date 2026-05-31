// Supabase client for Palace OS
// When env vars are not set (prototype/demo mode), returns a mock client
// so the app never crashes at import time.

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = () => {
  return !!supabaseUrl && !!supabaseAnonKey;
};

function createMockQueryBuilder(): any {
  const chain = () => builder;
  const resolveThen = (resolve: any) => resolve({ data: null, error: null });
  const rejectThen = (_resolve: any, reject: any) => reject(new Error('Query failed (demo mode)'));

  const methods: Record<string, any> = {
    select: chain, insert: chain, update: chain, delete: chain,
    eq: chain, neq: chain, gt: chain, gte: chain,
    lt: chain, lte: chain, like: chain, ilike: chain,
    is: chain, in: chain, order: chain, limit: chain,
    range: chain, single: chain, maybeSingle: chain, or: chain,
    rpc: chain, textSearch: chain, not: chain, filter: chain,
    abortSignal: chain, returns: chain,
  };

  const builder: any = new Proxy({}, {
    get: (_target, prop: string) => {
      if (prop === 'then') return resolveThen;
      if (prop === 'catch') return rejectThen;
      return methods[prop] || chain;
    },
  });

  return builder;
}

function createMockSupabaseClient(): any {
  return {
    from: () => createMockQueryBuilder(),
    rpc: () => createMockQueryBuilder(),
    auth: {
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      getUser: () => Promise.resolve({ data: { user: null }, error: null }),
      onAuthStateChange: () => ({
        data: { subscription: { unsubscribe: () => {} } },
      }),
      signInWithPassword: () =>
        Promise.resolve({ data: { user: null, session: null }, error: new Error('Supabase not configured — demo mode') }),
      signUp: () =>
        Promise.resolve({ data: { user: null, session: null }, error: new Error('Supabase not configured — demo mode') }),
      signOut: () => Promise.resolve({ error: null }),
      resetPasswordForEmail: () =>
        Promise.resolve({ data: {}, error: new Error('Supabase not configured — demo mode') }),
    },
    storage: {
      from: () => ({
        upload: () => Promise.resolve({ data: null, error: new Error('Supabase not configured — demo mode') }),
        download: () => Promise.resolve({ data: null, error: new Error('Supabase not configured — demo mode') }),
        getPublicUrl: () => ({ data: { publicUrl: '' } }),
        list: () => Promise.resolve({ data: null, error: null }),
        remove: () => Promise.resolve({ data: null, error: null }),
      }),
    },
    realtime: {
      channel: () => ({
        on: () => ({ subscribe: () => {} }),
        subscribe: () => {},
        unsubscribe: () => {},
      }),
    },
  };
}

export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createMockSupabaseClient();

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
