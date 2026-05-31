import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define the cart item type
interface CartItem {
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

// Define the cart state
interface CartState {
  items: CartItem[];
  // Actions
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeItem: (menuItemId: string) => void;
  updateQuantity: (menuItemId: string, quantity: number) => void;
  clearCart: () => void;
  // New action: set cart items (used for loading shared cart)
  setItems: (items: CartItem[]) => void;
  // Getters
  totalItems: () => number;
  totalPrice: () => number;
  isEmpty: () => boolean;
}

// Create the cart store with persistence (localStorage)
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find((i) => i.menuItemId === item.menuItemId);
          if (existingItem) {
            // If item already exists, increase quantity
            return {
              items: state.items.map((i) =>
                i.menuItemId === item.menuItemId
                  ? { ...i, quantity: i.quantity + quantity }
                  : i
              ),
            };
          } else {
            // If item doesn't exist, add it
            return {
              items: [...state.items, { ...item, quantity }],
            };
          }
        });
      },

      removeItem: (menuItemId) => {
        set((state) => ({
          items: state.items.filter((item) => item.menuItemId !== menuItemId),
        }));
      },

      updateQuantity: (menuItemId, quantity) => {
        if (quantity <= 0) {
          // If quantity is zero or less, remove the item
          return get().removeItem(menuItemId);
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.menuItemId === menuItemId ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },
      
      // Set cart items (used for loading shared cart)
      setItems: (items) => {
        set({ items });
      },

      totalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      totalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },

      isEmpty: () => {
        return get().items.length === 0;
      },
    }),
    {
      name: 'palace-os-cart', // name of the item in localStorage
      // Optional: customize the storage
      // getStorage: () => sessionStorage, // for sessionStorage
    }
  )
);
