// Checkout page for Bukka brand with Paystack integration
import Link from 'next/link';
import { Button } from '@/components/shared/Button';
import { useCartStore } from '@/lib/stores/cart';
import { useOrderStore } from '@/lib/stores/order';
import { useBrand } from '@/src/contexts/BrandContext';
import { useLoyaltyStore } from '@/lib/loyalty/store';
import { useState, useEffect } from 'react';
import { toKobo, initializePaystack } from '@/lib/payments/paystack';
import { isScheduledTimeInFuture, getMinScheduledTime, getMaxScheduledTime, formatDateOnly, formatTimeOnly } from '@/lib/utils/date-time';

interface CartItem {
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export default function CheckoutPage() {
  const { brandId } = useBrand();
  const { items, totalPrice, isEmpty, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  // Meal scheduling state
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [scheduleError, setScheduleError] = useState<string | null>(null);
  // Delivery/Pickup state
  const [deliveryMethod, setDeliveryMethod] = useState<'delivery' | 'pickup'>('pickup');

  // Initialize Paystack when component mounts
  useEffect(() => {
    initializePaystack();
  }, []);

  // Validate scheduling inputs
  const validateSchedule = () => {
    if (!isScheduled) return true;
    
    if (!scheduledDate || !scheduledTime) {
      setScheduleError('Please select both date and time');
      return false;
    }
    
    const scheduledDateTime = `${scheduledDate}T${scheduledTime}:00`;
    if (!isScheduledTimeInFuture(scheduledDateTime)) {
      setScheduleError('Please select a future date and time');
      return false;
    }
    
    const minTime = getMinScheduledTime();
    const maxTime = getMaxScheduledTime();
    
    if (scheduledDateTime < minTime) {
      setScheduleError('Orders must be scheduled at least 30 minutes in advance');
      return false;
    }
    
    if (scheduledDateTime > maxTime) {
      setScheduleError('Orders can only be scheduled up to 7 days in advance');
      return false;
    }
    
    setScheduleError(null);
    return true;
  };

   const handleCheckout = async () => {
    if (isEmpty) return;
    
    // Validate schedule if enabled
    if (!validateSchedule()) {
      return;
    }
    
    setLoading(true);
    setError(null);
    setPaymentStatus(null);
    
    try {
      // In a real app, you would get user email from auth context
      // For now, using a placeholder email
      const email = 'customer@example.com';
      
      // Calculate total including tax (7.5%)
      const totalWithTax = totalPrice * 1.075;
      const amountInKobo = toKobo(totalWithTax);
      
      // Prepare metadata
      const metadata = {
        cart_items: items.map(item => ({
          id: item.menuItemId,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        brand: brandId,
        timestamp: new Date().toISOString(),
        scheduled: isScheduled,
        ...(isScheduled && {
          scheduled_date: scheduledDate,
          scheduled_time: scheduledTime,
          scheduled_datetime: `${scheduledDate}T${scheduledTime}:00`
        }),
        delivery_method: deliveryMethod
      };
      
      // Call our API route to initialize payment
      const response = await fetch('/api/paystack', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'initialize',
          amount: totalWithTax, // Send in Naira, API converts to kobo
          email,
          metadata
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to initialize payment');
      }
      
      const data = await response.json();
      
       // In a real implementation, you would redirect to Paystack iframe/popup
       // For now, we'll simulate the payment process
       setPaymentStatus('Payment initialized successfully. Redirecting to Paystack...');
       
       // Simulate payment completion after 2 seconds for demo purposes
       setTimeout(async () => {
         // Verify the payment (in real app, this would happen on callback/redirect)
         const verifyResponse = await fetch('/api/paystack', {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json',
           },
           body: JSON.stringify({
             action: 'verify',
             reference: data.reference
           }),
         });
         
         if (!verifyResponse.ok) {
           throw new Error('Failed to verify payment');
         }
         
         const verifyData = await verifyResponse.json();
         
          if (verifyData.status === 'success') {
            // Create order for tracking
            const orderItems = items.map(item => ({
              menuItemId: item.menuItemId,
              name: item.name,
              price: item.price,
              quantity: item.quantity,
              image: item.image
            }));
            
            // Create order with scheduled time and delivery method if applicable
            const scheduledTimeValue = isScheduled 
              ? `${scheduledDate}T${scheduledTime}:00` 
              : new Date().toISOString();
            
            useOrderStore.getState().createOrder(orderItems, totalWithTax, scheduledTimeValue, deliveryMethod);
            
            // Add loyalty points for the purchase (10 points per ₦1 spent)
            const pointsEarned = Math.floor(totalWithTax * 10);
            useLoyaltyStore.getState().addPoints(pointsEarned);
            
            let successMessage = `Payment successful! Thank you for your order. You've earned ${pointsEarned} loyalty points.`;
            if (isScheduled) {
              successMessage += ` Your meal is scheduled for ${formatDateOnly(scheduledDate)} at ${formatTimeOnly(`${scheduledDate}T${scheduledTime}:00`)}.`;
            }
            successMessage += ` You selected ${deliveryMethod === 'delivery' ? 'delivery' : 'pickup'}.`;
            
            setPaymentStatus(successMessage);
            setTimeout(() => {
              clearCart();
              setIsScheduled(false);
              setScheduledDate('');
              setScheduledTime('');
              setDeliveryMethod('pickup');
              setPaymentStatus(null);
            }, 3000);
          } else {
            setPaymentStatus('Payment failed. Please try again.');
          }
        }, 2000);
      
    } catch (err) {
      console.error('Checkout error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred during checkout');
    } finally {
      setLoading(false);
    }
  };

  if (isEmpty) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-text">
        <p>Your cart is empty. <Link href="/menu">Add some items</Link> to proceed to checkout.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-text">
      {/* Header */}
      <header className="bg-bg/90 backdrop-blur-sm p-6 border-b border-border/50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold text-text-brand">
            {brandId === 'folixx-bukka' ? 'Folixx Bukka Checkout' : 'Secrets Palace Checkout'}
          </h1>
          <Link href="/menu" className="Button variant=secondary size=md">
            Continue Shopping
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="space-y-6">
          {/* Order Summary */}
          <div className="bg-card rounded-xl border border-border/50 p-6">
            <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
            
            {items.map((item) => (
              <div key={item.menuItemId} className="flex justify-between py-2 border-b border-border/50 last:border-b-0">
                <span>{item.name} x{item.quantity}</span>
                <span>?{(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
            
            <div className="mt-4 pt-4 border-t border-border/50 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>?{totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (7.5%):</span>
                <span>?{(totalPrice * 0.075).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-text-border">
                <span>Total:</span>
                <span>?{(totalPrice * 1.075).toLocaleString()}</span>
              </div>
            </div>
          </div>

            {/* Meal Scheduling Section */}
            <div className="bg-card rounded-xl border border-border/50 p-6">
              <h2 className="text-2xl font-semibold mb-4">When would you like your meal?</h2>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="schedule-checkbox"
                    checked={isScheduled}
                    onChange={(e) => {
                      setIsScheduled(e.target.checked);
                      if (!e.target.checked) {
                        setScheduledDate('');
                        setScheduledTime('');
                      }
                    }}
                    className="h-4 w-4 text-text-brand"
                  />
                  <label htmlFor="schedule-checkbox" className="text-text">
                    Schedule for future time
                  </label>
                </div>
                
                {isScheduled && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="schedule-date" className="block text-text-sm font-medium mb-2">
                          Date
                        </label>
                        <input
                          type="date"
                          id="schedule-date"
                          value={scheduledDate}
                          onChange={(e) => setScheduledDate(e.target.value)}
                          min={getCurrentDateISO().split('T')[0]}
                          disabled={loading}
                          className="Input w-full"
                        />
                      </div>
                      <div>
                        <label htmlFor="schedule-time" className="block text-text-sm font-medium mb-2">
                          Time
                        </label>
                        <input
                          type="time"
                          id="schedule-time"
                          value={scheduledTime}
                          onChange={(e) => setScheduledTime(e.target.value)}
                          disabled={loading}
                          className="Input w-full"
                        />
                      </div>
                    </div>
                    
                    {scheduleError && (
                      <div className="p-3 bg-red-50 border border-red-200 text-red-800 rounded">
                        {scheduleError}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
            
            {/* Delivery/Pickup Section */}
            <div className="bg-card rounded-xl border border-border/50 p-6">
              <h2 className="text-2xl font-semibold mb-4">How would you like to receive your order?</h2>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    id="delivery-option"
                    name="deliveryMethod"
                    value="delivery"
                    checked={deliveryMethod === 'delivery'}
                    onChange={(e) => setDeliveryMethod(e.target.value)}
                    disabled={loading}
                    className="h-4 w-4 text-text-brand"
                  />
                  <label htmlFor="delivery-option" className="text-text">
                    Delivery
                  </label>
                </div>
                
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    id="pickup-option"
                    name="deliveryMethod"
                    value="pickup"
                    checked={deliveryMethod === 'pickup'}
                    onChange={(e) => setDeliveryMethod(e.target.value)}
                    disabled={loading}
                    className="h-4 w-4 text-text-brand"
                  />
                  <label htmlFor="pickup-option" className="text-text">
                    Pickup
                  </label>
                </div>
              </div>
            </div>
           
           {/* Payment Section */}
           <div className="bg-card rounded-xl border border-border/50 p-6">
             <h2 className="text-2xl font-semibold mb-4">Payment</h2>
             
             {paymentStatus && (
               <div className="mb-4 p-4 rounded-lg" 
                    className={paymentStatus.includes('successful') ? 'bg-green-50 border border-green-200 text-green-800' 
                                  : paymentStatus.includes('failed') ? 'bg-red-50 border border-red-200 text-red-800'
                                  : 'bg-blue-50 border border-blue-200 text-blue-800'}>
                 {paymentStatus}
               </div>
             )}
             
             {error && (
               <div className="mb-4 p-4 rounded-lg bg-red-50 border border-red-200 text-red-800">
                 {error}
               </div>
             )}
             
             <Button
               variant="primary"
               size="lg"
               w-full
               disabled={loading || isEmpty}
               onClick={handleCheckout}
               className="mt-4"
             >
               {loading ? 'Processing Payment...' : 'Pay Now'}
             </Button>
             
             <p className="mt-4 text-text-sm text-text-muted">
               Payments are processed securely via Paystack (sandbox mode)
             </p>
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