import { useState, useCallback } from 'react';
import { GuestListService, GuestListEntry, GuestListFormData, UpdateRSVPData } from '@/lib/services/guestList';

// Hook for guest list functionality
export const useGuestList = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [guestList, setGuestList] = useState<GuestListEntry[]>([]);
  const [userGuestList, setUserGuestList] = useState<GuestListEntry[]>([]);

  // Add guest to event guest list
  const addGuest = useCallback(async (data: GuestListFormData) => {
    setLoading(true);
    setError(null);
    try {
      const result = await GuestListService.addGuest(data);
      if (!result.success) {
        throw new Error(result.error || 'Failed to add guest');
      }
      return result;
    } catch (err: any) {
      setError(err.message || 'Failed to add guest');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  // Get guest list for an event
  const fetchEventGuestList = useCallback(async (eventId: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await GuestListService.getEventGuestList(eventId);
      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch guest list');
      }
      setGuestList(result.data || []);
      return result;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch guest list');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  // Get user's guest list entries
  const fetchUserGuestList = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await GuestListService.getUserGuestListEntries();
      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch user guest list');
      }
      setUserGuestList(result.data || []);
      return result;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch user guest list');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  // Update RSVP status
  const updateRSVP = useCallback(async (data: UpdateRSVPData) => {
    setLoading(true);
    setError(null);
    try {
      const result = await GuestListService.updateRSVP(data);
      if (!result.success) {
        throw new Error(result.error || 'Failed to update RSVP');
      }
      
      // Update local state
      setGuestList(prev => 
        prev.map(entry => 
          entry.id === data.guestListId 
            ? { ...entry, rsvp_status: data.rsvpStatus } 
            : entry
        )
      );
      
      setUserGuestList(prev => 
        prev.map(entry => 
          entry.id === data.guestListId 
            ? { ...entry, rsvp_status: data.rsvpStatus } 
            : entry
        )
      );
      
      return result;
    } catch (err: any) {
      setError(err.message || 'Failed to update RSVP');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  // Remove guest from guest list
  const removeGuest = useCallback(async (guestListId: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await GuestListService.removeGuest(guestListId);
      if (!result.success) {
        throw new Error(result.error || 'Failed to remove guest');
      }
      
      // Update local state
      setGuestList(prev => prev.filter(entry => entry.id !== guestListId));
      setUserGuestList(prev => prev.filter(entry => entry.id !== guestListId));
      
      return result;
    } catch (err: any) {
      setError(err.message || 'Failed to remove guest');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    // State
    loading,
    error,
    guestList,
    userGuestList,
    
    // Actions
    addGuest,
    fetchEventGuestList,
    fetchUserGuestList,
    updateRSVP,
    removeGuest
  };
};