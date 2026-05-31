import Link from 'next/link';
import { useOrderStore } from '@/lib/stores/order';
import { useBrand } from '@/src/contexts/BrandContext';
import { useAuth } from '@/lib/auth/hooks/useAuth';
import { Button } from '@/components/shared/Button';
import { useOrderRealtime } from '@/lib/hooks/useOrderRealtime';

export default function OrderTrackingPage() {
  const { brandId } = useBrand();
  const { lastOrder, getOrderStatusText } = useOrderStore();
  const { user } = useAuth();
  
  // Subscribe to real-time order status updates
  useOrderRealtime();

  if (!lastOrder) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-text">
        <p>No recent orders found. <Link href="/menu">Start ordering</Link> to track your order.</p>
      </div>
    );
  }

  // Define order status steps for progress bar
  const statusSteps = [
    { id: 'confirmed', label: 'Order Confirmed' },
    { id: 'preparing', label: 'Preparing' },
    { id: 'ready', label: 'Ready for Pickup' },
    { id: 'completed', label: 'Completed' },
  ];

  // Get current status index
  const currentStatusIndex = statusSteps.findIndex(
    (step) => step.id === lastOrder.status
  );

  return (
    <div className="min-h-screen bg-background text-text">
      {/* Header */}
      <header className="bg-bg/90 backdrop-blur-sm p-6 border-b border-border/50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold text-text-brand">
            {brandId === 'folixx-bukka' ? 'Folixx Bukka Order Tracking' : 'Secrets Palace Order Tracking'}
          </h1>
          <Link href="/" className="Button variant=secondary size=md">
            Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="space-y-8">
           {/* Order Info */}
           <div className="bg-card rounded-xl border border-border/50 p-6">
             <h2 className="text-2xl font-semibold mb-4">Order Details</h2>
             <div className="space-y-4">
               <div className="flex justify-between">
                 <span>Order ID:</span>
                 <span className="font-mono">{lastOrder.id}</span>
               </div>
               <div className="flex justify-between">
                 <span>Order Time:</span>
                 <span>{new Date(lastOrder.timestamp).toLocaleString()}</span>
               </div>
                {lastOrder.scheduledTime && (
                  <div className="flex justify-between">
                    <span>Scheduled For:</span>
                    <span>{new Date(lastOrder.scheduledTime).toLocaleString()}</span>
                  </div>
                )}
                {lastOrder.deliveryMethod && (
                  <div className="flex justify-between">
                    <span>Delivery Method:</span>
                    <span>{lastOrder.deliveryMethod === 'delivery' ? 'Delivery' : 'Pickup'}</span>
                  </div>
                )}
               <div className="flex justify-between">
                 <span>Status:</span>
                 <span className={`font-semibold ${
                   lastOrder.status === 'completed'
                     ? 'text-green-600'
                     : lastOrder.status === 'cancelled'
                     ? 'text-red-600'
                     : 'text-blue-600'
                 }`}>
                   {getOrderStatusText()}
                 </span>
               </div>
               <div className="flex justify-between pt-2 border-t border-border/50">
                 <span>Total:</span>
                 <span className="font-bold text-xl">?{lastOrder.totalPrice.toLocaleString()}</span>
               </div>
             </div>
           </div>

          {/* Order Items */}
          <div className="bg-card rounded-xl border border-border/50 p-6">
            <h2 className="text-2xl font-semibold mb-4">Order Items</h2>
            <div className="space-y-4">
              {lastOrder.items.map((item) => (
                <div key={item.menuItemId} className="flex justify-between py-2 border-b border-border/50 last:border-b-0">
                  <span>{item.name} x{item.quantity}</span>
                  <span>?{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Status Progress Bar */}
          <div className="bg-card rounded-xl border border-border/50 p-6">
            <h2 className="text-2xl font-semibold mb-4">Order Progress</h2>
            <div className="space-y-6">
              {statusSteps.map((step, index) => (
                <div key={step.id} className="flex items-center space-x-4">
                  {/* Status Circle */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    index < currentStatusIndex
                      ? 'bg-green-600'
                      : index === currentStatusIndex
                      ? 'bg-blue-600'
                      : 'bg-border/50'
                  }`}>
                    {index === currentStatusIndex ? (
                      <span className="text-text-inverse text-xs">›</span>
                    ) : (
                      <span className="text-text-inverse text-xs">✓</span>
                    )}
                  </div>
                  
                  {/* Status Label */}
                  <span className={`text-text ${
                    index < currentStatusIndex
                      ? 'font-medium'
                      : index === currentStatusIndex
                      ? 'font-semibold text-text-brand'
                      : 'text-text-muted'
                  }`}>
                    {step.label}
                  </span>
                  
                  {/* Connector Line (except for last step) */}
                  {index < statusSteps.length - 1 && (
                    <div className="h-0.5 w-8 flex-1">
                      <div className={`h-full w-full bg-${
                        index < currentStatusIndex
                          ? 'green-600'
                          : index === currentStatusIndex
                          ? 'blue-600'
                          : 'border/50
                      }`}></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <Button variant="outline" size="md" href="/menu">
              Continue Shopping
            </Button>
            {lastOrder.status !== 'completed' && lastOrder.status !== 'cancelled' && (
              <Button variant="secondary" size="md">
                Reorder
              </Button>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-bg/50 backdrop-blur-sm p-8 border-t border-border/50">
        <div className="max-w-7xl mx-auto text-center">
          <Link href="/" className="Button variant=secondary size=md">
            Home
          </Link>
        </div>
      </footer>
    </div>
  );
}