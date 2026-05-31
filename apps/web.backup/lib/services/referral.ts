import { supabase } from './supabase';

// Types
export interface Referral {
  id: string;
  referrer_id: string;
  referee_id: string | null;
  referral_code: string;
  status: 'pending' | 'completed' | 'cancelled';
  reward_granted: boolean;
  reward_points: number;
  created_at: string;
  updated_at: string;
}

export interface ReferralFormData {
  referralCode?: string; // For when a new user signs up with a referral code
}

// Service class
export class ReferralService {
  // Generate a unique referral code
  static generateReferralCode(): string {
    // Generate a 8-character alphanumeric code
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
  }

  // Create a referral entry for the current user (generates their referral code)
  static async createReferralCode(): Promise<{ success: boolean; error?: string; data?: Referral }> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        return { success: false, error: 'User not authenticated' };
      }

      // Check if user already has a referral code
      const { data: existingReferral, error: checkError } = await supabase
        .from('referrals')
        .select('*')
        .eq('referrer_id', user.id)
        .in('status', ['pending', 'completed'])
        .single();

      if (checkError && checkError.code !== 'PGRST116') { // PGRST116 means no rows returned
        return { success: false, error: checkError.message };
      }

      if (existingReferral) {
        // User already has a referral code, return it
        return { success: true, data: existingReferral };
      }

      // Generate a unique referral code
      let referralCode = this.generateReferralCode();
      let isUnique = false;
      
      // Ensure the code is unique (though collision is extremely unlikely)
      while (!isUnique) {
        const { data: existingCode, error: codeError } = await supabase
          .from('referrals')
          .select('id')
          .eq('referral_code', referralCode)
          .single();
        
        if (codeError && codeError.code !== 'PGRST116') {
          return { success: false, error: codeError.message };
        }
        
        if (!existingCode) {
          isUnique = true;
        } else {
          // Generate a new code if collision occurs
          referralCode = this.generateReferralCode();
        }
      }

      const { data: referral, error } = await supabase
        .from('referrals')
        .insert({
          referrer_id: user.id,
          referral_code: referralCode,
          status: 'pending'
        })
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data: referral };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Get the current user's referral code and stats
  static async getReferralInfo(): Promise<{ success: boolean; error?: string; data?: { referralCode: string; totalReferrals: number; completedReferrals: number; pendingReferrals: number } }> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        return { success: false, error: 'User not authenticated' };
      }

      // Get referral code
      const { data: referral, error: referralError } = await supabase
        .from('referrals')
        .select('*')
        .eq('referrer_id', user.id)
        .in('status', ['pending', 'completed'])
        .single();

      if (referralError && referralError.code !== 'PGRST116') {
        return { success: false, error: referralError.message };
      }

      // If no referral exists, create one
      let referralCode = referral?.referral_code;
      if (!referralCode) {
        const createResult = await this.createReferralCode();
        if (!createResult.success) {
          return { success: false, error: createResult.error };
        }
        referralCode = createResult.data?.referral_code;
      }

      // Get referral stats
      const { data: stats, error: statsError } = await supabase
        .from('referrals')
        .select(`
          status,
          referee_id
        `)
        .eq('referrer_id', user.id);

      if (statsError) {
        return { success: false, error: statsError.message };
      }

      const totalReferrals = stats.length;
      const completedReferrals = stats.filter(s => s.status === 'completed' && s.referee_id !== null).length;
      const pendingReferrals = stats.filter(s => s.status === 'pending' || (s.status === 'completed' && s.referee_id === null)).length;

      return {
        success: true,
        data: {
          referralCode: referralCode || '',
          totalReferrals,
          completedReferrals,
          pendingReferrals
        }
      };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Process a referral when a new user signs up with a referral code
  static async processReferral(referralCode: string, refereeId: string): Promise<{ success: boolean; error?: string; data?: Referral }> {
    try {
      // Find the referral by code
      const { data: referral, error: referralError } = await supabase
        .from('referrals')
        .select('*')
        .eq('referral_code', referralCode)
        .eq('status', 'pending')
        .single();

      if (referralError) {
        return { success: false, error: 'Invalid or expired referral code' };
      }

      if (!referral) {
        return { success: false, error: 'Referral not found' };
      }

      // Check if referee is trying to use their own referral code
      const { data: { user } } = await supabase.auth.getUser();
      if (user && user.id === referral.referrer_id) {
        return { success: false, error: 'You cannot use your own referral code' };
      }

      // Update the referral with referee info and grant reward
      const { data: updatedReferral, error: updateError } = await supabase
        .from('referrals')
        .update({
          referee_id: refereeId,
          status: 'completed',
          reward_granted: true
        })
        .eq('id', referral.id)
        .select()
        .single();

      if (updateError) {
        return { success: false, error: updateError.message };
      }

      // Grant points to the referrer (this would typically be done through the loyalty service)
      // For now, we'll just mark that the reward has been granted
      // In a full implementation, we'd call the loyalty service to add points

      return { success: true, data: updatedReferral };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Get all referrals for the current user
  static async getUserReferrals(): Promise<{ success: boolean; error?: string; data?: Referral[] }> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        return { success: false, error: 'User not authenticated' };
      }

      const { data, error } = await supabase
        .from('referrals')
        .select(`
          *,
          referee:users(id, email)
        `)
        .eq('referrer_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data: data as Referral[] };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Cancel a referral (only if pending)
  static async cancelReferral(referralId: string): Promise<{ success: boolean; error?: string }> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        return { success: false, error: 'User not authenticated' };
      }

      const { error } = await supabase
        .from('referrals')
        .update({ status: 'cancelled' })
        .eq('id', referralId)
        .eq('referrer_id', user.id);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }
}