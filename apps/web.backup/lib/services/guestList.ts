import { supabase } from './supabase';

// Types
export interface GuestListEntry {
  id: string;
  event_id: string;
  user_id: string | null;
  guest_name: string;
  guest_email: string | null;
  guest_phone: string | null;
  rsvp_status: 'invited' | 'accepted' | 'declined' | 'pending';
  plus_one: boolean;
  plus_one_name: string | null;
  dietary_restrictions: string | null;
  notes: string | null;
  invited_by: string | null;
  invited_at: string;
  updated_at: string;
}

export interface GuestListFormData {
  eventId: string;
  guestName: string;
  guestEmail?: string;
  guestPhone?: string;
  plusOne?: boolean;
  plusOneName?: string;
  dietaryRestrictions?: string;
  notes?: string;
}

export interface UpdateRSVPData {
  guestListId: string;
  rsvpStatus: 'accepted' | 'declined' | 'pending';
}

// Service class
export class GuestListService {
  // Add guest to event guest list
  static async addGuest(data: GuestListFormData): Promise<{ success: boolean; error?: string; data?: GuestListEntry }> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      // Determine user_id - if guest is adding themselves, use their user ID
      // If inviting someone else, user_id can be null initially
      const userId = user ? user.id : null;
      const invitedBy = user ? user.id : null;

      const { data: guestListEntry, error } = await supabase
        .from('guest_list')
        .insert({
          event_id: data.eventId,
          user_id: userId,
          guest_name: data.guestName,
          guest_email: data.guestEmail || null,
          guest_phone: data.guestPhone || null,
          plus_one: data.plusOne || false,
          plus_one_name: data.plusOneName || null,
          dietary_restrictions: data.dietaryRestrictions || null,
          notes: data.notes || null,
          invited_by: invitedBy
        })
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data: guestListEntry };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Get guest list for an event
  static async getEventGuestList(eventId: string): Promise<{ success: boolean; error?: string; data?: GuestListEntry[] }> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      // Check if user has permission to view this event's guest list
      // For now, we'll allow authenticated users to view guest lists
      // In a more robust implementation, we'd check if they're invited or the inviter
      if (!user) {
        return { success: false, error: 'User not authenticated' };
      }

      const { data, error } = await supabase
        .from('guest_list')
        .select(`
          *,
          user:users(id, email),
          inviter:users(id, email)
        `)
        .eq('event_id', eventId)
        .order('invited_at', { ascending: false });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data: data as GuestListEntry[] };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Get user's guest list entries (events they're invited to)
  static async getUserGuestListEntries(): Promise<{ success: boolean; error?: string; data?: GuestListEntry[] }> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        return { success: false, error: 'User not authenticated' };
      }

      const { data, error } = await supabase
        .from('guest_list')
        .select(`
          *,
          event:events(id, title, date, time, image, location),
          inviter:users(id, email)
        `)
        .eq('user_id', user.id)
        .order('invited_at', { ascending: false });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data: data as GuestListEntry[] };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Update RSVP status
  static async updateRSVP(data: UpdateRSVPData): Promise<{ success: boolean; error?: string }> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        return { success: false, error: 'User not authenticated' };
      }

      const { error } = await supabase
        .from('guest_list')
        .update({ rsvp_status: data.rsvpStatus })
        .eq('id', data.guestListId)
        .eq('user_id', user.id); // Ensure user can only update their own RSVP

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Remove guest from guest list
  static async removeGuest(guestListId: string): Promise<{ success: boolean; error?: string }> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        return { success: false, error: 'User not authenticated' };
      }

      const { error } = await supabase
        .from('guest_list')
        .delete()
        .eq('id', guestListId)
        .or(`user_id.eq.${user.id},invited_by.eq.${user.id}`); // User can remove if they're the guest or the inviter

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }
}