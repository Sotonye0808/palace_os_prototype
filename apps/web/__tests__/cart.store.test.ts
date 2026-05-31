import { describe, expect, test, vi } from 'vitest';
import { useCartStore } from '@/lib/stores/cart';

// Mock localStorage for testing
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
global.localStorage = localStorageMock as any;

describe('Cart Store', () => {
  test('should initialize with empty cart', () => {
    const { getState } = useCartStore.getState();
    const state = getState();
    expect(state.items).toHaveLength(0);
    expect(state.totalItems()).toBe(0);
    expect(state.totalPrice()).toBe(0);
    expect(state.isEmpty()).toBe(true);
  });

  test('should add item to cart', () => {
    const { addItem, getState } = useCartStore.getState();
    
    const item = {
      menuItemId: '1',
      name: 'Test Item',
      price: 1000,
      image: '/test.jpg'
    };
    
    addItem(item);
    
    const state = getState();
    expect(state.items).toHaveLength(1);
    expect(state.items[0]).toMatchObject({
      ...item,
      quantity: 1
    });
    expect(state.totalItems()).toBe(1);
    expect(state.totalPrice()).toBe(1000);
    expect(state.isEmpty()).toBe(false);
  });

  test('should increase quantity when adding existing item', () => {
    const { addItem, getState } = useCartStore.getState();
    
    const item = {
      menuItemId: '1',
      name: 'Test Item',
      price: 1000,
      image: '/test.jpg'
    };
    
    // Add item twice
    addItem(item);
    addItem(item);
    
    const state = getState();
    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(2);
    expect(state.totalItems()).toBe(2);
    expect(state.totalPrice()).toBe(2000);
  });

  test('should remove item from cart', () => {
    const { addItem, removeItem, getState } = useCartStore.getState();
    
    const item = {
      menuItemId: '1',
      name: 'Test Item',
      price: 1000,
      image: '/test.jpg'
    };
    
    addItem(item);
    expect(getState().items).toHaveLength(1);
    
    removeItem('1');
    expect(getState().items).toHaveLength(0);
    expect(getState().totalItems()).toBe(0);
    expect(getState().totalPrice()).toBe(0);
  });

  test('should update item quantity', () => {
    const { addItem, updateQuantity, getState } = useCartStore.getState();
    
    const item = {
      menuItemId: '1',
      name: 'Test Item',
      price: 1000,
      image: '/test.jpg'
    };
    
    addItem(item);
    updateQuantity('1', 3);
    
    const state = getState();
    expect(state.items[0].quantity).toBe(3);
    expect(state.totalItems()).toBe(3);
    expect(state.totalPrice()).toBe(3000);
  });

  test('should remove item when quantity set to zero', () => {
    const { addItem, updateQuantity, getState } = useCartStore.getState();
    
    const item = {
      menuItemId: '1',
      name: 'Test Item',
      price: 1000,
      image: '/test.jpg'
    };
    
    addItem(item);
    updateQuantity('1', 0); // Should remove item
    
    const state = getState();
    expect(state.items).toHaveLength(0);
  });

  test('should clear cart', () => {
    const { addItem, clearCart, getState } = useCartStore.getState();
    
    const item1 = {
      menuItemId: '1',
      name: 'Test Item 1',
      price: 1000,
      image: '/test1.jpg'
    };
    
    const item2 = {
      menuItemId: '2',
      name: 'Test Item 2',
      price: 2000,
      image: '/test2.jpg'
    };
    
    addItem(item1);
    addItem(item2);
    expect(getState().items).toHaveLength(2);
    
    clearCart();
    expect(getState().items).toHaveLength(0);
    expect(getState().totalItems()).toBe(0);
    expect(getState().totalPrice()).toBe(0);
  });
}
