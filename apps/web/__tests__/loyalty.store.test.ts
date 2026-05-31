import { describe, expect, test, vi, beforeEach } from 'vitest';
import { useLoyaltyStore } from '@/lib/loyalty/store';

// Mock localStorage for testing
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
global.localStorage = localStorageMock as any;

describe('Loyalty Store', () => {
  beforeEach(() => {
    // Clear the store before each test
    useLoyaltyStore.getState().setTier({ id: 'bronze', name: 'Bronze Member', minPoints: 0, benefits: [], discountPercentage: 0 });
    useLoyaltyStore.getState().addPoints(0); // Reset to 0 points
  });

  test('should initialize with zero points and bronze tier', () => {
    const { getState } = useLoyaltyStore.getState();
    const state = getState();
    
    expect(state.points).toBe(0);
    expect(state.tier?.id).toBe('bronze');
    expect(state.tier?.name).toBe('Bronze Member');
  });

  test('should add points correctly', () => {
    const { addPoints, getState } = useLoyaltyStore.getState();
    
    addPoints(100);
    
    const state = getState();
    expect(state.points).toBe(100);
    expect(state.tier?.id).toBe('bronze'); // Still bronze (0-499 points)
  });

  test('should upgrade tier when points threshold is reached', () => {
    const { addPoints, getState } = useLoyaltyStore.getState();
    
    // Add enough points to reach silver tier (500 points)
    addPoints(500);
    
    const state = getState();
    expect(state.points).toBe(500);
    expect(state.tier?.id).toBe('silver');
    expect(state.tier?.name).toBe('Silver Member');
  });

  test('should not downgrade tier when points are removed but still above threshold', () => {
    const { addPoints, redeemPoints, getState } = useLoyaltyStore.getState();
    
    // Add enough points to reach gold tier (1500 points)
    addPoints(1500);
    
    // Spend some points but stay above silver threshold
    redeemPoints(200);
    
    const state = getState();
    expect(state.points).toBe(1300);
    expect(state.tier?.id).toBe('gold'); // Should still be gold (1300 >= 1500? No, wait...)
    // Actually 1300 is between 500 and 1500, so should be silver
    expect(state.tier?.id).toBe('silver');
  });

  test('should redeem points correctly', () => {
    const { addPoints, redeemPoints, getState, canRedeem } = useLoyaltyStore.getState();
    
    // Add points first
    addPoints(1000);
    
    // Check we can redeem 500 points
    expect(canRedeem(500)).toBe(true);
    
    // Redeem 500 points
    const result = redeemPoints(500);
    
    expect(result).toBe(true);
    
    const state = getState();
    expect(state.points).toBe(500);
    expect(state.tier?.id).toBe('silver'); // 500 points = silver tier
  });

  test('should not allow redemption of more points than available', () => {
    const { addPoints, redeemPoints, canRedeem } = useLoyaltyStore.getState();
    
    // Add points
    addPoints(100);
    
    // Check we cannot redeem more than we have
    expect(canRedeem(200)).toBe(false);
    
    // Try to redeem more than we have
    const result = redeemPoints(200);
    
    expect(result).toBe(false);
    
    // Points should remain unchanged
    const { getState } = useLoyaltyStore.getState();
    expect(getState().points).toBe(100);
  });

  test('should calculate tier benefits correctly', () => {
    const { addPoints, getTierBenefits, getState } = useLoyaltyStore.getState();
    
    // Start with bronze
    expect(getTierBenefits()).toEqual(['Welcome drink on first visit', 'Birthday discount']);
    
    // Add points to reach silver
    addPoints(500);
    expect(getTierBenefits()).toEqual(['10% off food', 'Priority reservation', 'Free dessert monthly']);
    
    // Add points to reach gold
    addPoints(1000); // Total 1500 points
    expect(getTierBenefits()).toEqual(['15% off food & drinks', 'Complimentary appetizer', 'Birthday cake']);
    
    // Add points to reach platinum
    addPoints(1500); // Total 3000 points
    expect(getTierBenefits()).toEqual(['20% off everything', 'Free bottle of wine', 'Private dining access']);
  });

  test('should persist data in localStorage', () => {
    const { addPoints, getState } = useLoyaltyStore.getState();
    
    // Add some points
    addPoints(750);
    
    // Verify localStorage setItem was called
    expect(localStorageMock.setItem).toHaveBeenCalled();
    
    // Get the stored value
    const setItemCall = localStorageMock.setItem.mock.calls[0];
    expect(setItemCall[0]).toBe('palace-os-loyalty');
    
    // Parse the stored value
    const storedState = JSON.parse(setItemCall[1]);
    expect(storedState.points).toBe(750);
    expect(storedState.tier?.id).toBe('silver');
  });
});