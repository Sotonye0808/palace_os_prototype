import { useState, useCallback } from 'react';
import { ReferralService, Referral, ReferralFormData } from '@/lib/services/referral';

export function useReferral() {
  const [referralInfo, setReferralInfo] = useState<{ referralCode: string; totalReferrals: number; completedReferrals: number; pendingReferrals: number } | null>(null);
  const [userReferrals, setUserReferrals] = useState<Referral[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Create or get referral code for the current user
  const createReferralCode = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await ReferralService.createReferralCode();
      if (!result.success) {
        throw new Error(result.error || 'Failed to create referral code');
      }
      return result;
    } catch (err: any) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  // Get referral info (code and stats)
  const getReferralInfo = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await ReferralService.getReferralInfo();
      if (!result.success) {
        throw new Error(result.error || 'Failed to get referral info');
      }
      setReferralInfo(result.data);
      return result;
    } catch (err: any) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  // Get all referrals for the current user
  const getUserReferrals = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await ReferralService.getUserReferrals();
      if (!result.success) {
        throw new Error(result.error || 'Failed to get user referrals');
      }
      setUserReferrals(result.data || []);
      return result;
    } catch (err: any) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  // Process a referral when a new user signs up with a referral code
  const processReferral = useCallback(async (referralCode: string, refereeId: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await ReferralService.processReferral(referralCode, refereeId);
      if (!result.success) {
        throw new Error(result.error || 'Failed to process referral');
      }
      
      // Refresh referral info and user referrals after processing
      await getReferralInfo();
      await getUserReferrals();
      
      return result;
    } catch (err: any) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, [getReferralInfo, getUserReferrals]);

  // Cancel a referral (only if pending)
  const cancelReferral = useCallback(async (referralId: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await ReferralService.cancelReferral(referralId);
      if (!result.success) {
        throw new Error(result.error || 'Failed to cancel referral');
      }
      
      // Refresh user referrals after cancellation
      await getUserReferrals();
      
      return result;
    } catch (err: any) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, [getUserReferrals]);

  // Initial load on mount would be done by the consumer
  // by calling getReferralInfo() and getUserReferrals() in a useEffect

  return {
    referralInfo,
    userReferrals,
    loading,
    error,
    createReferralCode,
    getReferralInfo,
    getUserReferrals,
    processReferral,
    cancelReferral
  };
}