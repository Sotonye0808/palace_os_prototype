import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useCartStore } from '@/lib/stores/cart';
import { createSharedCartService } from '@/lib/services/sharedCart';
import { useBrand } from '@/src/contexts/BrandContext';
import Link from 'next/link';
import { Button } from '@/components/shared/Button';
import { Loader } from '@/components/shared/Loader';

interface CartItem {
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export default function SharedCartPage() {
  const { cartId } = useParams<{ cartId: string }>();
  const { brandId } = useBrand();
  const { items, setItems, isEmpty, totalItems, totalPrice } = useCartStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [brand, setBrand] = useState<'bukka' | 'palace' | null>(null);

  // Map brandId from context to our brand type
  useEffect(() => {
    if (brandId === 'folixx-bukka') {
      setBrand('bukka');
    } else if (brandId === 'secrets-palace') {
      setBrand('palace');
    }
  }, [brandId]);

  useEffect(() => {
    if (!cartId) return;

    const loadSharedCart = async () => {
      try {
        setLoading(true);
        setError(null);
        const sharedCartService = createSharedCartService();
        const sharedCart = await sharedCartService.getSharedCart(cartId);

        // Verify brand matches current context (optional, but good for UX)
        if (brand && sharedCart.brand !== brand) {
          // In a real app, you might want to show a warning or redirect
          console.warn('Shared cart brand does not match current brand context');
        }

        // Set the cart items in the store
        setItems(sharedCart.cart_data);
      } catch (err) {
        console.error('Failed to load shared cart:', err);
        setError(
          err instanceof Error
            ? err.message
            : 'Failed to load shared cart. Please check the link and try again.'
        );
      } finally {
        setLoading(false);
      }
    };

    loadSharedCart();
  }, [cartId, brand, setItems]);

  if (loading) {
    return (
      <div className=\"min-h-screen flex items-center justify-center bg-background\">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className=\"min-h-screen flex items-center justify-center bg-background p-6\">
        <div className=\"bg-card rounded-xl border border-border/50 p-6 max-w-xl w-full text-center\">
          <h2 className=\"text-2xl font-semibold text-text-brand mb-4\">Could not load cart</h2>
          <p className=\"text-text-muted mb-6\">{error}</p>
          <Link href=\"/menu\" className=\"inline-block\">
            <Button variant=\"primary\" size=\"md\">Browse Menu</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className=\"min-h-screen bg-background text-text\">
      {/* Header */}
      <header className=\"bg-bg/90 backdrop-blur-sm p-6 border-b border-border/50\">
        <div className=\"max-w-7xl mx-auto flex justify-between items-center\">
          <h1 className=\"text-3xl font-bold text-text-brand\">
            {brand === 'bukka' ? 'Folixx Bukka' : 'Secrets Palace'} Shared Cart
          </h1>
          <div className=\"flex items-center space-x-4\">
            <span className=\"text-text-sm text-text-muted\">\n              {totalItems} item{totalItems !== 1 ? 's' : ''}\n            </span>\n            {brand && !isEmpty && (
              <Link href=\"/checkout\" className=\"inline-block\">\n                <Button variant=\"primary\" size=\"md\">\n                  Checkout\n                </Button>\n              </Link>\n            )}
          </div>\n        </div>\n      </header>\n\n      {isEmpty ? (\n        <main className=\"flex min-h-[calc(100vh-160px)] items-center justify-center px-4\">\n          <div className=\"text-center\">\n            <h2 className=\"text-2xl font-semibold text-text-muted mb-4\">\n              This cart is empty\n            </h2>\n            <p className=\"text-text-muted max-w-xl\">\n              The shared cart you are viewing has no items.\n            </p>\n            {brand && (\n              <Link href=\"/menu\" className=\"inline-block mt-6\">\n                <Button variant=\"primary\" size=\"md\">\n                  Browse Menu\n                </Button>\n              </Link>\n            )}\n          </div>\n        </main>\n      ) : (\n        <main className=\"max-w-7xl mx-auto px-4 py-12\">\n          <div className=\"space-y-6\">\n            {/* Cart Items */}\n            <div className=\"space-y-4\">\n              {items.map((item: CartItem) => (\n                <div\n                  key={item.menuItemId}\n                  className=\"bg-card rounded-xl border border-border/50 p-4 flex flex-col md:flex-row items-start\"\n                >\n                  <div className=\"flex-shrink-0 w-24 h-24 md:w-32 md:h-32\">\n                    {item.image ? (\n                      <img\n                        src={item.image}\n                        alt={item.name}\n                        className=\"w-full h-full object-cover rounded-lg\"\n                      />\n                    ) : (\n                      <div className=\"w-full h-full bg-border/20 rounded-lg flex items-center justify-center\">\n                        ... (line truncated to 2000 chars)
101: }