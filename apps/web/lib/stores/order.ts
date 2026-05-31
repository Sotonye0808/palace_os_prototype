import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define the order item type (similar to cart item)
interface OrderItem {
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

// Define the order status
type OrderStatus = 'confirmed' | 'preparing' | 'ready' | 'completed' | 'cancelled';

// Define the order state
interface OrderState {
  // Last completed order (for tracking)
  lastOrder: {
    id: string;
    items: OrderItem[];
    totalPrice: number;
    status: OrderStatus;
    timestamp: string;
    scheduledTime?: string; // For meal scheduling (pre-order for future time)
    deliveryMethod?: 'delivery' | 'pickup'; // Delivery or pickup
  } | null;
  // Actions
  createOrder: (items: OrderItem[], totalPrice: number, scheduledTime?: string, deliveryMethod?: 'delivery' | 'pickup') => void;
  updateOrderStatus: (status: OrderStatus) => void;
  // Getters
  getOrderStatusText: () => string;
}

// Create the order store with persistence (localStorage)
export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      lastOrder: null,

    createOrder: (items, totalPrice, scheduledTime = new Date().toISOString(), deliveryMethod: 'delivery' | 'pickup' = 'pickup') => {
          const orderId = `order_${Date.now()}`;
          set({
            lastOrder: {
              id: orderId,
              items,
              totalPrice,
              status: 'confirmed', // initial status
              timestamp: new Date().toISOString(),
              scheduledTime: scheduledTime,
              deliveryMethod: deliveryMethod,
            },
          });
        },

      updateOrderStatus: (status) => {
        set((state) => ({
          lastOrder: state.lastOrder
            ? { ...state.lastOrder, status }
            : null,
        }));
      },

      getOrderStatusText: () => {
        const order = get().lastOrder;
        if (!order) return 'No active order';

        const statusText: Record<OrderStatus, string> = {
          confirmed: 'Order Confirmed',
          preparing: 'Preparing Your Order',
          ready: 'Ready for Pickup',
          completed: 'Order Completed',
          cancelled: 'Order Cancelled',
        };

        return statusText[order.status] || 'Unknown Status';
      },
    }),
    {
      name: 'palace-os-orders', // name of the item in localStorage
    }
  )
);