'use client';

import Link from 'next/link';
import { Button } from '@/components/shared/Button';
import { useCartStore } from '@/lib/stores/cart';
import { useBrand } from '@/lib/contexts/BrandContext';
import { createSharedCartService } from '@/lib/services/sharedCart';
import { useState } from 'react';

interface CartItem {
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export default function CartPage() {
  const { brandId } = useBrand();
  const { items, totalItems, totalPrice, isEmpty, clearCart, updateQuantity, removeItem } = useCartStore();
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [isSharing, setIsSharing] = useState(false);

  const handleShareCart = async () => {
    if (isEmpty || isSharing) return;

    setIsSharing(true);
    try {
      const sharedCartService = createSharedCartService();
      const sharedCart = await sharedCartService.createSharedCart(items, brandId === 'folixx-bukka' ? 'bukka' : 'palace');
      const shareableUrl = sharedCartService.generateShareableUrl(sharedCart.id);
      setShareUrl(shareableUrl);
    } catch (error) {
      console.error('Failed to share cart:', error);
      alert('Failed to generate share link. Please try again.');
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-text">
      {/* Header */}
      <header className="bg-bg/90 backdrop-blur-sm p-6 border-b border-border/50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold text-text-brand">
            {brandId === 'folixx-bukka' ? 'Folixx Bukka Cart' : 'Secrets Palace Cart'}
          </h1>
           <div className="flex items-center space-x-4">
             <span className="text-text-sm text-text-muted">
               {totalItems} item{totalItems !== 1 ? 's' : ''}
             </span>
             <Button
               variant="secondary"
               size="sm"
               onClick={clearCart}
               disabled={isEmpty}
             >
               Clear Cart
             </Button>
             {!isEmpty && (
               <Button
                 variant="outline"
                 size="sm"
                 onClick={handleShareCart}
                 disabled={isSharing}
                 className="flex items-center space-x-2"
               >
                 {isSharing ? (
                   <>
                     Sharing...
                   </>
                 ) : (
                   <>
                     Share Cart
                   </>
                 )}
               </Button>
             )}
           </div>
         </div>
       </header>

       {isEmpty ? (
         <main className="flex min-h-[calc(100vh-160px)] items-center justify-center px-4">
           <div className="text-center">
             <h2 className="text-2xl font-semibold text-text-muted mb-4">
               Your cart is empty
             </h2>
             <p className="text-text-muted max-w-xl">
               Add some delicious items to your cart to get started!
             </p>
             <Link href="/menu" className="inline-block mt-6">
               <Button variant="primary" size="md">
                 Browse Menu
               </Button>
             </Link>
           </div>
         </main>
       ) : (
         <main className="max-w-7xl mx-auto px-4 py-12">
           <div className="space-y-6">
             {/* Share URL Section */}
             {shareUrl && (
               <div className="bg-card rounded-xl border border-border/50 p-6">
                 <h2 className="text-xl font-semibold text-text-brand mb-4">
                   Share this cart
                 </h2>
                 <div className="mb-4">
                   <input
                     type="text"
                     value={shareUrl}
                     readOnly
                     className="w-full px-4 py-2 bg-input border border-input/50 rounded-lg text-text-sm font-mono select-all"
                     onClick={(e) => {
                       e.target.select();
                     }}
                   />
                 </div>
                 <Button
                   variant="secondary"
                   size="sm"
                   onClick={() => {
                     navigator.clipboard.writeText(shareUrl);
                     alert('Link copied to clipboard!');
                   }}
                 >
                   Copy Link
                 </Button>
               </div>
             )}
             {/* Cart Items */}
             <div className="space-y-4">
               {items.map((item) => (
                 <div
                   key={item.menuItemId}
                   className="bg-card rounded-xl border border-border/50 p-4 flex flex-col md:flex-row items-start"
                 >
                   <div className="flex-shrink-0 w-24 h-24 md:w-32 md:h-32">
                     {item.image ? (
                       <img
                         src={item.image}
                         alt={item.name}
                         className="w-full h-full object-cover rounded-lg"
                       />) : (
                       <div className="w-full h-full bg-border/20 rounded-lg flex items-center justify-center">
                         <span className="text-text-muted">No image</span>
                       </div>
                     )}
                   </div>
                   <div className="flex-1 flex flex-col space-y-2 ml-4 md:ml-6">
                     <h3 className="text-text font-medium">{item.name}</h3>
                     <p className="flex items-center space-x-2 text-text-sm">
                       <Button
                         variant="ghost"
                         size="xs"
                         onClick={() => updateQuantity(item.menuItemId, item.quantity - 1)}
                         disabled={item.quantity === 1}
                       >
                         -
                       </Button>
                       <span className="w-8 text-center">{item.quantity}</span>
                       <Button
                         variant="ghost"
                         size="xs"
                         onClick={() => updateQuantity(item.menuItemId, item.quantity + 1)}
                       >
                         +
                       </Button>
                     </p>
                     <p className="text-text-muted">
                       ${item.price.toFixed(2)} x {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
                     </p>
                   </div>
                   <Button
                     variant="ghost"
                     size="xs"
                     className="self-start"
                     onClick={() => removeItem(item.menuItemId)}
                   >
                     Remove
                   </Button>
                 </div>
               ))}
             </div>
             <div className="border-t border-border/50 pt-6">
               <div className="flex justify-between items-center mt-4">
                 <span className="text-text-sm text-text-muted">
                   Total ({totalItems} item{totalItems !== 1 ? 's' : ''}):
                 </span>
                 <span className="text-2xl font-bold text-text-brand">
                   ${totalPrice.toFixed(2)}
                 </span>
               </div>
               {!isEmpty && (
                 <Link href="/checkout" className="mt-6 w-full">
                   <Button variant="primary" size="lg">
                     Proceed to Checkout
                   </Button>
                 </Link>
               )}
            </div>
          </div>
        </main>
        )}
      </div>
  );
}

