// Paystack payment service for Palace OS
// Handles payment processing in sandbox mode

import { supabase } from '../auth/supabase';

// Paystack API configuration
const PAYSTACK_PUBLIC_KEY = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '';
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY || '';
const PAYSTACK_BASE_URL = 'https://api.paystack.co';

// Initialize headers for API requests
const getHeaders = () => ({
  Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
  'Content-Type': 'application/json',
});

// Initialize Paystack on window load (for frontend usage)
export const initializePaystack = () => {
  if (typeof window !== 'undefined' && window.PaystackPop) {
    window.PaystackPop.setup({
      key: PAYSTACK_PUBLIC_KEY,
      // Add any additional setup if needed
    });
    return true;
  }
  return false;
};

// Create a payment transaction with Paystack
export const createPaymentTransaction = async (
  amount: number, // amount in kobo (smallest currency unit)
  email: string,
  metadata?: Record<string, any>
) => {
  try {
    const response = await fetch(`${PAYSTACK_BASE_URL}/transaction/initialize`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({
        amount,
        email,
        metadata: {
          ...metadata,
          // Add Palace OS specific metadata
          source: 'palace-os',
          timestamp: new Date().toISOString(),
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Paystack API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.status) {
      throw new Error(data.message || 'Failed to initialize transaction');
    }

    return {
      success: true,
      data: data.data,
    };
  } catch (error) {
    console.error('Error creating Paystack transaction:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

// Verify a payment transaction with Paystack
export const verifyPaymentTransaction = async (
  reference: string
) => {
  try {
    const response = await fetch(
      `${PAYSTACK_BASE_URL}/transaction/verify/${encodeURIComponent(reference)}`,
      {
        method: 'GET',
        headers: getHeaders(),
      }
    );

    if (!response.ok) {
      throw new Error(`Paystack API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.status) {
      throw new Error(data.message || 'Failed to verify transaction');
    }

    return {
      success: true,
      data: data.data,
    };
  } catch (error) {
    console.error('Error verifying Paystack transaction:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

// Get list of banks (for future use with account transfers)
export const getBanks = async (country: string = 'NG') => {
  try {
    const response = await fetch(
      `${PAYSTACK_BASE_URL}/bank?country=${country}&perPage=100`,
      {
        method: 'GET',
        headers: getHeaders(),
      }
    );

    if (!response.ok) {
      throw new Error(`Paystack API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.status) {
      throw new Error(data.message || 'Failed to fetch banks');
    }

    return {
      success: true,
      data: data.data,
    };
  } catch (error) {
    console.error('Error fetching banks from Paystack:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

// Helper function to convert amount to kobo (multiply by 100)
export const toKobo = (amount: number): number => {
  return Math.round(amount * 100);
};

// Helper function to convert from kobo to Naira (divide by 100)
export const fromKobo = (kobo: number): number => {
  return kobo / 100;
};

// Check if Paystack is properly configured
export const isPaystackConfigured = () => {
  return Boolean(PAYSTACK_PUBLIC_KEY && PAYSTACK_SECRET_KEY);
};

// Type definitions for Paystack responses
export interface PaystackTransactionData {
  id: number;
  domain: string;
  status: string;
  reference: string;
  amount: number;
  message: string;
  gateway_response: string;
  paid_at: string;
  created_at: string;
  channel: string;
  currency: string;
  ip_address: string;
  metadata: Record<string, any>;
  log: {
    start_time: number;
    time_spent: number;
    attempts: number;
    authentication: number;
    feedback: string;
    mobile_money: {
      phone_number: string;
      provider: string;
    };
  };
  fees: number;
  fees_split: null;
  authorization: {
    authorization_code: string;
    bin: string;
    last4: string;
    exp_month: string;
    exp_year: string;
    channel: string;
    card_type: string;
    bank: string;
    country_code: string;
    brand: string;
    reusable: boolean;
    signature: string;
    account_name: string;
  };
  customer: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    customer_code: string;
    phone: string | null;
    metadata: Record<string, any>;
    risk_action: string;
  };
  plan: object;
  split: object;
  order_id: string | null;
  paidAt: string;
  createdAt: string;
  requested_amount: number;
  pos_transaction_data: null;
  source: object;
  interest: object;
  subscription: object;
  timed_out_last: boolean;
  summary: object;
  transaction_date: string;
  plan_object: object;
  split_object: object;
}

export interface PaystackVerifyResponse extends PaystackTransactionData {
  status: boolean;
  message: string;
}

export interface PaystackInitializeResponse extends PaystackTransactionData {
  status: boolean;
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}
