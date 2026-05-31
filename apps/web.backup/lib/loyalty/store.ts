import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { LoyaltyTier, LoyaltyConfig } from '@/packages/config/src/types';
import { fallbackLoyaltyConfig } from '@/packages/config/src/defaults';

// Define the loyalty state
interface LoyaltyState {
  points: number;
  tier: LoyaltyTier | null;
  // Actions
  addPoints: (points: number) => void;
  redeemPoints: (points: number) => boolean; // returns true if successful
  setTier: (tier: LoyaltyTier) => void;
  // Getters
  getTierBenefits: () => string[];
  canRedeem: (points: number) => boolean;
}

// Use fallback loyalty config (in a real app, this would come from the config system)
const mockLoyaltyConfig: LoyaltyConfig = fallbackLoyaltyConfig;

// Function to get tier based on points
const getTierFromPoints = (points: number, tiers: LoyaltyTier[]): LoyaltyTier => {
  // Sort tiers by minPoints descending
  const sortedTiers = [...tiers].sort((a, b) => b.minPoints - a.minPoints);
  for (const tier of sortedTiers) {
    if (points >= tier.minPoints) {
      return tier;
    }
    // If no tier matches, return the lowest tier (should be bronze with 0 points)
  }
  // Default to first tier (bronze) if points are less than all tiers
  return tiers[tiers.length - 1];
};

// Create the loyalty store with persistence
export const useLoyaltyStore = create<LoyaltyState>()(
  persist(
    (set, get) => ({
      points: 0,
      tier: null,

      addPoints: (pointsToAdd) => {
        set((state) => {
          const newPoints = state.points + pointsToAdd;
          const newTier = getTierFromPoints(newPoints, mockLoyaltyConfig.tiers);
          return {
            points: newPoints,
            tier: newTier
          };
        });
      },

      redeemPoints: (pointsToRedeem) => {
        const state = get();
        if (!state.canRedeem(pointsToRedeem)) {
          return false;
        }
        set((state) => {
          const newPoints = state.points - pointsToRedeem;
          const newTier = getTierFromPoints(newPoints, mockLoyaltyConfig.tiers);
          return {
            points: newPoints,
            tier: newTier
          };
        });
        return true;
      },

      setTier: (tier) => {
        set({ tier });
      },

      getTierBenefits: () => {
        const state = get();
        return state.tier ? state.tier.benefits : [];
      },

      canRedeem: (pointsToCheck) => {
        const state = get();
        return state.points >= pointsToCheck;
      }
    }),
    {
      name: 'palace-os-loyalty', // name of the item in localStorage
    }
  )
);

// Selector hooks for convenience
export const useLoyaltyPoints = () => useLoyaltyStore((state) => state.points);
export const useLoyaltyTier = () => useLoyaltyStore((state) => state.tier);
export const useLoyaltyBenefits = () => useLoyaltyStore((state) => state.getTierBenefits());
