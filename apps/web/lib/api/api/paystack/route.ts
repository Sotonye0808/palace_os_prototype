// Paystack payment API route for Palace OS
// Handles payment initialization and verification in sandbox mode

import { NextRequest, NextResponse } from 'next/server';
import { createPaymentTransaction, verifyPaymentTransaction, isPaystackConfigured } from '@/lib/payments/paystack';

// Initialize a payment transaction
export async function POST(request: NextRequest) {
  try {
    // Check if Paystack is configured
    if (!isPaystackConfigured()) {
      return NextResponse.json(
        { error: 'Paystack is not configured' },
        { status: 500 }
      );
    }

    const { action, ...data } = await request.json();

    if (action === 'initialize') {
      const { amount, email, metadata } = data;

      // Validate required fields
      if (!amount || !email) {
        return NextResponse.json(
          { error: 'Amount and email are required' },
          { status: 400 }
        );
      }

      // Convert amount to kobo (if amount is in Naira, multiply by 100)
      const amountInKobo = Math.round(amount * 100); // assuming amount is in Naira

      const result = await createPaymentTransaction(amountInKobo, email, metadata);

      if (!result.success) {
        return NextResponse.json(
          { error: result.error },
          { status: 400 }
        );
      }

      return NextResponse.json(result.data);
    } else if (action === 'verify') {
      const { reference } = data;

      if (!reference) {
        return NextResponse.json(
          { error: 'Transaction reference is required' },
          { status: 400 }
        );
      }

      const result = await verifyPaymentTransaction(reference);

      if (!result.success) {
        return NextResponse.json(
          { error: result.error },
          { status: 400 }
        );
      }

      return NextResponse.json(result.data);
    } else {
      return NextResponse.json(
        { error: 'Invalid action' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Paystack API route error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handle GET requests for verification (optional, but can be used for redirect handling)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const reference = searchParams.get('reference');

    if (!reference) {
      return NextResponse.json(
        { error: 'Transaction reference is required' },
        { status: 400 }
      );
    }

    const result = await verifyPaymentTransaction(reference);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json(result.data);
  } catch (error) {
    console.error('Paystack API route error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
