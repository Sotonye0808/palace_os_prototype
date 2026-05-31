import { supabase } from '@/lib/auth/supabase';

// Types
export interface Address {
  id: string;
  user_id: string;
  label: string;
  address_line_1: string;
  address_line_2: string | null;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  latitude: number | null;
  longitude: number | null;
  is_default: boolean;
  google_place_id: string | null;
  formatted_address: string | null;
  created_at: string;
  updated_at: string;
}

export interface AddressFormData {
  label: string;
  address_line_1: string;
  address_line_2?: string;
  city: string;
  state: string;
  postal_code: string;
  country?: string;
  latitude?: number | null;
  longitude?: number | null;
  is_default?: boolean;
  google_place_id?: string | null;
  formatted_address?: string | null;
}

// Service class
export class AddressBookService {
  // Get all addresses for the current user
  static async getAddresses(): Promise<{ success: boolean; error?: string; data?: Address[] }> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        return { success: false, error: 'User not authenticated' };
      }

      const { data, error } = await supabase
        .from('address_book')
        .select('*')
        .eq('user_id', user.id)
        .order('is_default', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data: data as Address[] };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Get a specific address by ID
  static async getAddressById(id: string): Promise<{ success: boolean; error?: string; data?: Address }> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        return { success: false, error: 'User not authenticated' };
      }

      const { data, error } = await supabase
        .from('address_book')
        .select('*')
        .eq('id', id)
        .eq('user_id', user.id)
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      if (!data) {
        return { success: false, error: 'Address not found' };
      }

      return { success: true, data: data };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Create a new address
  static async createAddress(data: AddressFormData): Promise<{ success: boolean; error?: string; data?: Address }> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        return { success: false, error: 'User not authenticated' };
      }

      // If setting as default, unset other defaults first
      if (data.is_default) {
        await this.unsetDefaultAddresses(user.id);
      }

      const { data: newAddress, error } = await supabase
        .from('address_book')
        .insert({
          user_id: user.id,
          label: data.label,
          address_line_1: data.address_line_1,
          address_line_2: data.address_line_2 || null,
          city: data.city,
          state: data.state,
          postal_code: data.postal_code,
          country: data.country || 'Nigeria',
          latitude: data.latitude || null,
          longitude: data.longitude || null,
          is_default: data.is_default || false,
          google_place_id: data.google_place_id || null,
          formatted_address: data.formatted_address || null
        })
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data: newAddress };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Update an existing address
  static async updateAddress(id: string, data: Partial<AddressFormData>): Promise<{ success: boolean; error?: string; data?: Address }> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        return { success: false, error: 'User not authenticated' };
      }

      // If setting as default, unset other defaults first
      if (data.is_default) {
        await this.unsetDefaultAddresses(user.id);
      }

      const { data: updatedAddress, error } = await supabase
        .from('address_book')
        .update({
          label: data.label,
          address_line_1: data.address_line_1,
          address_line_2: data.address_line_2 ?? null,
          city: data.city,
          state: data.state,
          postal_code: data.postal_code,
          country: data.country,
          latitude: data.latitude ?? null,
          longitude: data.longitude ?? null,
          is_default: data.is_default,
          google_place_id: data.google_place_id,
          formatted_address: data.formatted_address,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      if (!updatedAddress) {
        return { success: false, error: 'Address not found' };
      }

      return { success: true, data: updatedAddress };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Delete an address
  static async deleteAddress(id: string): Promise<{ success: boolean; error?: string }> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        return { success: false, error: 'User not authenticated' };
      }

      const { error } = await supabase
        .from('address_book')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Set an address as default
  static async setAsDefault(id: string): Promise<{ success: boolean; error?: string; data?: Address }> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        return { success: false, error: 'User not authenticated' };
      }

      // Unset other defaults first
      await this.unsetDefaultAddresses(user.id);

      const { data: updatedAddress, error } = await supabase
        .from('address_book')
        .update({ is_default: true, updated_at: new Date().toISOString() })
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      if (!updatedAddress) {
        return { success: false, error: 'Address not found' };
      }

      return { success: true, data: updatedAddress };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Helper to unset all default addresses for a user
  private static async unsetDefaultAddresses(userId: string): Promise<void> {
    await supabase
      .from('address_book')
      .update({ is_default: false })
      .eq('user_id', userId)
      .eq('is_default', true);
  }

  // Get Google Places autocomplete suggestions
  static async getPlaceAutocomplete(input: string): Promise<{ success: boolean; error?: string; data?: any[] }> {
    try {
      // In a real implementation, we would call the Google Places API
      // For now, we'll return mock data to demonstrate the structure
      
      // TODO: Replace with actual Google Places API call
      // const response = await fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}&components=country:ng`);
      
      // Mock response for development
      const mockData = [
        {
          description: "123 Ahmadu Bello Way, Victoria Island, Lagos, Nigeria",
          place_id: "ChIJN1t_tDeuEmsRUsoyG83frY4",
          structured_formatting: {
            main_text: "123 Ahmadu Bello Way",
            secondary_text: "Victoria Island, Lagos, Nigeria"
          }
        },
        {
          description: "456 Olaf Palme Street, Maitama, Abuja, Nigeria",
          place_id: "ChIJX1t_tDeuEmsRUsoyG83frY5",
          structured_formatting: {
            main_text: "456 Olaf Palme Street",
            secondary_text: "Maitama, Abuja, Nigeria"
          }
        }
      ];

      // Filter mock data based on input
      const filteredData = mockData.filter(item => 
        item.description.toLowerCase().includes(input.toLowerCase())
      );

      return { success: true, data: filteredData };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Get place details from Google Place ID
  static async getPlaceDetails(placeId: string): Promise<{ success: boolean; error?: string; data?: any }> {
    try {
      // In a real implementation, we would call the Google Places API
      // For now, we'll return mock data to demonstrate the structure
      
      // TODO: Replace with actual Google Places API call
      // const response = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}&fields=address_component,geometry,formatted_address`);
      
      // Mock response for development
      const mockData = {
        place_id: placeId,
        formatted_address: "123 Ahmadu Bello Way, Victoria Island, Lagos, Nigeria",
        address_components: [
          { long_name: "123", short_name: "123", types: ["street_number"] },
          { long_name: "Ahmadu Bello Way", short_name: "Ahmadu Bello Way", types: ["route"] },
          { long_name: "Victoria Island", short_name: "Victoria Island", types: ["neighborhood", "political"] },
          { long_name: "Lagos", short_name: "Lagos", types: ["locality", "political"] },
          { long_name: "Lagos State", short_name: "Lagos State", types: ["administrative_area_level_1", "political"] },
          { long_name: "Nigeria", short_name: "NG", types: ["country", "political"] }
        ],
        geometry: {
          location: {
            lat: 6.4280,
            lng: 3.4219
          }
        }
      };

      return { success: true, data: mockData };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }
}