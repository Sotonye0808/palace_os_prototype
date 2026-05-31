// Shared Cart Service for Palace OS
// Handles creation, retrieval, and management of shareable carts for group ordering

import { supabase } from '@/lib/auth/supabase';

// Types for shared cart functionality
export interface SharedCart {
  id: string;
  user_id: string | null;
  brand: 'bukka' | 'palace';
  cart_data: any[]; // Array of cart items
  created_at: string;
  expires_at: string;
}

// Cart item type (same as in cart store)
export interface CartItem {
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export class SharedCartService {
  /**
   * Create a new shareable cart
   * @param cartItems The items to include in the shared cart
   * @param brand The brand context (bukka or palace)
   * @returns The created shared cart object with shareable ID
   */
  async createSharedCart(cartItems: CartItem[], brand: 'bukka' | 'palace'): Promise<SharedCart> {
    try {
      // Get current user session
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const userId = user ? user.id : null;

      // Insert the shared cart into the database
      const { data, error } = await supabase
        .from('shared_carts')
        .insert({
          user_id: userId,
          brand,
          cart_data: cartItems,
          expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days expiry
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Failed to create shared cart:', error);
      throw error;
    }
  }

  /**
   * Retrieve a shared cart by its ID
   * @param cartId The ID of the shared cart to retrieve
   * @returns The shared cart object
   */
  async getSharedCart(cartId: string): Promise<SharedCart> {
    try {
      const { data, error } = await supabase
        .from('shared_carts')
        .select('*')
        .eq('id', cartId)
        .single();

      if (error) throw error;
      if (!data) throw new Error('Shared cart not found');
      return data;
    } catch (error) {
      console.error('Failed to retrieve shared cart:', error);
      throw error;
    }
  }

  /**
   * Update an existing shared cart
   * @param cartId The ID of the shared cart to update
   * @param cartItems The updated cart items
   * @returns The updated shared cart object
   */
  async updateSharedCart(
    cartId: string,
    cartItems: CartItem[]
  ): Promise<SharedCart> {
    try {
      // Get current user session
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error('User must be authenticated to update shared cart');

      const { data, error } = await supabase
        .from('shared_carts')
        .update({
          cart_data: cartItems,
          updated_at: new Date().toISOString(),
        })
        .eq('id', cartId)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      if (!data) throw new Error('Shared cart not found or unauthorized');
      return data;
    } catch (error) {
      console.error('Failed to update shared cart:', error);
      throw error;
    }
  }

  /**
   * Delete a shared cart
   * @param cartId The ID of the shared cart to delete
   */
  async deleteSharedCart(cartId: string): Promise<void> {
    try {
      // Get current user session
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error('User must be authenticated to delete shared cart');

      const { error } = await supabase
        .from('shared_carts')
        .delete()
        .eq('id', cartId)
        .eq('user_id', user.id);

      if (error) throw error;
    } catch (error) {
      console.error('Failed to delete shared cart:', error);
      throw error;
    }
  }

  /**
   * Generate a shareable URL for a shared cart
   * @param cartId The ID of the shared cart
   * @returns The full shareable URL
   */
  generateShareableUrl(cartId: string): string {
    // Get the base URL from window location or use a default
    const baseUrl =
      typeof window !== 'undefined'
        ? `${window.location.origin}`
        : process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    // Determine brand from cartId or context (we'll need to fetch cart details for brand)
    // For now, we'll use a generic path and determine brand when loading the cart
    return `${baseUrl}/cart/shared/${cartId}`;
  }

  /**
   * Extract cart ID from a shareable URL
   * @param url The shareable URL
   * @returns The cart ID if found, null otherwise
   */
  extractCartIdFromUrl(url: string): string | null {
    try {
      const urlObj = new URL(url);
      const pathParts = urlObj.pathname.split('/');
      // Expected format: /cart/shared/:cartId
      const cartIndex = pathParts.indexOf('shared');
      if (cartIndex !== -1 && pathParts[cartIndex + 1]) {
        return pathParts[cartIndex + 1];
      }
      return null;
    } catch (error) {
      return null;
    }
  }
}

// Factory function to create shared cart service
export function createSharedCartService(): SharedCartService {
  return new SharedCartService();
}