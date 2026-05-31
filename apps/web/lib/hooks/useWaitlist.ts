import { useState, useCallback } from 'react';
import { WaitlistService, WaitlistEntry, WaitlistFormData } from '@/lib/services/waitlist';

export function useWaitlist() {
  const [waitlistEntries, setWaitlistEntries] = useState<WaitlistEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Join waitlist for an event
  const joinWaitlist = useCallback(async (data: WaitlistFormData) => {
    setLoading(true);
    setError(null);
    try {
      const result = await WaitlistService.joinWaitlist(data);
      if (!result.success) {
        throw new Error(result.error || 'Failed to join waitlist');
      }
      // Optionally refetch waitlist entries after joining
      await fetchUserWaitlistEntries();
      return result;
    } catch (err: any) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch user's waitlist entries
  const fetchUserWaitlistEntries = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await WaitlistService.getUserWaitlistEntries();
      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch waitlist entries');
      }
      setWaitlistEntries(result.data || []);
      return result;
    } catch (err: any) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  // Cancel a waitlist entry
  const cancelWaitlistEntry = useCallback(async (waitlistId: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await WaitlistService.cancelWaitlistEntry(waitlistId);
      if (!result.success) {
        throw new Error(result.error || 'Failed to cancel waitlist entry');
      }
      // Remove the cancelled entry from the list
      setWaitlistEntries(prev => prev.filter(entry => entry.id !== waitlistId));
      return result;
    } catch (err: any) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  // Confirm a waitlist entry (when notified and user wants to book)
  const confirmWaitlistEntry = useCallback(async (waitlistId: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await WaitlistService.confirmWaitlistEntry(waitlistId);
      if (!result.success) {
        throw new Error(result.error || 'Failed to confirm waitlist entry');
      }
      // Update the entry status in the list
      setWaitlistEntries(prev =>
        prev.map(entry =>
          entry.id === waitlistId ? { ...entry, status: 'confirmed' } : entry
        )
      );
      return result;
    } catch (err: any) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  // Get waitlist position for an entry
  const getWaitlistPosition = useCallback(async (waitlistId: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await WaitlistService.getWaitlistPosition(waitlistId);
      if (!result.success) {
        throw new Error(result.error || 'Failed to get waitlist position');
      }
      return result;
    } catch (err: any) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load of waitlist entries on mount would be done by the consumer
  // by calling fetchUserWaitlistEntries in a useEffect

  return {
    waitlistEntries,
    loading,
    error,
    joinWaitlist,
    fetchUserWaitlistEntries,
    cancelWaitlistEntry,
    confirmWaitlistEntry,
    getWaitlistPosition
  };
}