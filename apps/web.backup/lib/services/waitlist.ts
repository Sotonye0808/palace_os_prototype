import { supabase } from './supabase';

// Types
export interface WaitlistEntry {
  id: string;
  user_id: string;
  event_id: string;
  party_size: number;
  status: 'waiting' | 'notified' | 'confirmed' | 'cancelled' | 'expired';
  notified_at: string | null;
  expires_at: string | null;
  position: number | null;
  created_at: string;
  updated_at: string;
}

export interface WaitlistFormData {
  eventId: string;
  partySize: number;
}

// Service class
export class WaitlistService {
  // Add user to waitlist for an event
  static async joinWaitlist(data: WaitlistFormData): Promise<{ success: boolean; error?: string; data?: WaitlistEntry }> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        return { success: false, error: 'User not authenticated' };
      }

      const { data: waitlistEntry, error } = await supabase
        .from('waitlist')
        .insert({
          user_id: user.id,
          event_id: data.eventId,
          party_size: data.partySize,
          status: 'waiting'
        })
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data: waitlistEntry };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Get user's waitlist entries
  static async getUserWaitlistEntries(): Promise<{ success: boolean; error?: string; data?: WaitlistEntry[] }> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        return { success: false, error: 'User not authenticated' };
      }

      const { data, error } = await supabase
        .from('waitlist')
        .select(`
          *,
          event:events(id, title, date, time, image, location)
        `)
        .eq('user_id', user.id)
        .in('status', ['waiting', 'notified'])
        .order('created_at', { ascending: true });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data: data as WaitlistEntry[] };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Get waitlist position for an entry
  static async getWaitlistPosition(waitlistId: string): Promise<{ success: boolean; error?: string; data?: number }> {
    try {
      const { data, error } = await supabase
        .rpc('get_waitlist_position', { waitlist_id_param: waitlistId });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data: data };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Cancel waitlist entry
  static async cancelWaitlistEntry(waitlistId: string): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase
        .from('waitlist')
        .update({ status: 'cancelled' })
        .eq('id', waitlistId);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Confirm waitlist entry (when notified and user wants to book)
  static async confirmWaitlistEntry(waitlistId: string): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase
        .from('waitlist')
        .update({ status: 'confirmed' })
        .eq('id', waitlistId);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }
}

// Helper function to calculate waitlist position
export async function calculateWaitlistPosition(eventId: string): Promise<number> {
  try {
    const { count, error } = await supabase
      .from('waitlist')
      .select('id', { count: 'exact', head: true })
      .eq('event_id', eventId)
      .in('status', ['waiting', 'notified']);

    if (error) throw error;
    
    // Position is count + 1 (next in line)
    return (count || 0) + 1;
  } catch (error) {
    console.error('Error calculating waitlist position:', error);
    return 1; // Default to position 1 if error
  }
}