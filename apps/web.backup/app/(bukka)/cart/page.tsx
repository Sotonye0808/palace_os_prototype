import Link from 'next/link';
import { Button } from '@/components/shared/Button';
import { useCartStore } from '@/lib/stores/cart';
import { useBrand } from '@/src/contexts/BrandContext';
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
            <span className="text-text-sm text-text-muted">\n              {totalItems} item{totalItems !== 1 ? 's' : ''}\n            </span>\n            <Button\n              variant=\"secondary\"\n              size=\"sm\"\n              onClick={clearCart}\n              disabled={isEmpty}\n            >\n              Clear Cart\n            </Button>\n            {!isEmpty && (\n              <Button\n                variant=\"outline\"\n                size=\"sm\"\n                onClick={handleShareCart}\n                disabled={isSharing}\n                className=\"flex items-center space-x-2\"\n              >\n                {isSharing ? (\n                  <>\n                    Sharing...\n                  </>\n                ) : (\n                  <>\n                    Share Cart\n                  </>\n                )}\n              </Button>\n            )}\n          </div>\n        </div>\n      </header>\n\n      {isEmpty ? (\n        <main className=\"flex min-h-[calc(100vh-160px)] items-center justify-center px-4\">\n          <div className=\"text-center\">\n            <h2 className=\"text-2xl font-semibold text-text-muted mb-4\">\n              Your cart is empty\n            </h2>\n            <p className=\"text-text-muted max-w-xl\">\n              Add some delicious items to your cart to get started!\n            </p>\n            <Link href=\"/menu\" className=\"inline-block mt-6\">\n              <Button variant=\"primary\" size=\"md\">\n                Browse Menu\n              </Button>\n            </Link>\n          </div>\n        </main>\n      ) : (\n        <main className=\"max-w-7xl mx-auto px-4 py-12\">\n          <div className=\"space-y-6\">\n            {/* Share URL Section */}\n            {shareUrl && (\n              <div className=\"bg-card rounded-xl border border-border/50 p-6\">\n                <h2 className=\"text-xl font-semibold text-text-brand mb-4\">\n                  Share this cart\n                </h2>\n                <div className=\"mb-4\">\n                  <input\n                    type=\"text\"\n                    value={shareUrl}\n                    readOnly\n                    className=\"w-full px-4 py-2 bg-input border border-input/50 rounded-lg text-text-sm font-mono select-all\"\n                    onClick={(e) => {\n                      e.target.select();\n                    }}\n                  />\n                </div>\n                <Button\n                  variant=\"secondary\"\n                  size=\"sm\"\n                  onClick={() => {\n                    navigator.clipboard.writeText(shareUrl);\n                    alert('Link copied to clipboard!');\n                  }}\n                >\n                  Copy Link\n                </Button>\n              </div>\n            )}\n            {/* Cart Items */}\n            <div className=\"space-y-4\">\n              {items.map((item) => (\n                <div\n                  key={item.menuItemId}\n                  className=\"bg-card rounded-xl border border-border/50 p-4 flex flex-col md:flex-row items-start\"\n                >\n                  <div className=\"flex-shrink-0 w-24 h-24 md:w-32 md:h-32\">\n                    {item.image ? (\n                      <img\n                        src={item.image}\n                        alt={item.name}\n                        className=\"w-full h-full object-cover rounded-lg\"\n                      />\n                    ) : (\n                      <div className=\"w-full h-full bg-border/20 rounded-lg flex items-center justify-center\">\n                        <span className=\"text-text-muted\">No image</span>\n                      </div>\n                    )}\n                  </div>\n                  <div className=\"flex-1 flex flex-col space-y-2 ml-4 md:ml-6\">\n                    <h3 className=\"text-text font-medium\">{item.name}</h3>\n                    <p className=\"flex items-center space-x-2 text-text-sm\">\n                      <Button\n                        variant=\"ghost\"\n                        size=\"xs\"\n                        onClick={() => updateQuantity(item.menuItemId, item.quantity - 1)}\n                        disabled={item.quantity === 1}\n                      >\n                        -\n                      </Button>\n                      <span className=\"w-8 text-center\">{item.quantity}</span>\n                      <Button\n                        variant=\"ghost\"\n                        size=\"xs\"\n                        onClick={() => updateQuantity(item.menuItemId, item.quantity + 1)}\n                      >\n                        +\n                      </Button>\n                    </p>\n                    <p className=\"text-text-muted\">\n                      ${item.price.toFixed(2)} x {item.quantity} = ${(item.price * item.quantity).toFixed(2)}\n                    </p>\n                  </div>\n                  <Button\n                    variant=\"ghost\"\n                    size=\"xs\"\n                    className=\"self-start\"\n                    onClick={() => removeItem(item.menuItemId)}\n                  >\n                    Remove\n                  </Button>\n                </div>\n              ))}\n            </div>\n            <div className=\"border-t border-border/50 pt-6\">\n              <div className=\"flex justify-between items-center mt-4\">\n                <span className=\"text-text-sm text-text-muted\">\n                  Total ({totalItems} item{totalItems !== 1 ? 's' : ''}):\n                </span>\n                <span className=\"text-2xl font-bold text-text-brand\">\n                  ${totalPrice.toFixed(2)}\n                </span>\n              </div>\n              {!isEmpty && (\n                <Link href=\"/checkout\" className=\"mt-6 w-full\">\n                  <Button variant=\"primary\" size=\"lg\">\n                    Proceed to Checkout\n                  </Button>\n                </Link>\n              )}\n            </div>\n          </main>\n        )\n      }\n    </div>
  );
}