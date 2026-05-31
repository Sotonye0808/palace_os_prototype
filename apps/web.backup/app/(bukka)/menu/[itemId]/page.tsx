import { Image } from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/shared/Button';
import { useBrand } from '@/src/contexts/BrandContext';
import { useCartStore } from '@/lib/stores/cart';
import { useState } from 'react';

// Import our new menu types
import { MenuItem, ModifierGroup, DietaryTag } from '@/src/types/menu';
import { getMenuItemJsonLd } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';

// Mock menu data - in a real app, this would come from config/system
const mockMenuItems: Record<string, MenuItem> = {
  'samosa': {
    id: 'samosa',
    name: 'Spicy Samosa',
    description: 'Crispy pastry filled with spiced potatoes and peas',
    price: 500,
    image: '/images/items/samosa.jpg',
    category: 'appetizers',
    isFeatured: true,
    isAvailable: true,
    dietaryTags: [
      { id: 'vegetarian', label: 'Vegetarian', value: 'vegetarian' },
      { id: 'halal', label: 'Halal', value: 'halal' }
    ],
    modifiers: [
      {
        id: 'spice-level',
        name: 'Spice Level',
        description: 'Choose your preferred spice level',
        minSelection: 1,
        maxSelection: 1,
        options: [
          { id: 'mild', label: 'Mild', priceAdjustment: 0, isDefault: true },
          { id: 'medium', label: 'Medium', priceAdjustment: 50 },
          { id: 'hot', label: 'Hot', priceAdjustment: 100 }
        ]
      },
      {
        id: 'serving-size',
        name: 'Serving Size',
        description: 'Select serving size',
        minSelection: 1,
        maxSelection: 1,
        options: [
          { id: 'regular', label: 'Regular (2 pcs)', priceAdjustment: 0, isDefault: true },
          { id: 'large', label: 'Large (4 pcs)', priceAdjustment: 200 }
        ]
      }
    ]
  },
  'jollof-rice': {
    id: 'jollof-rice',
    name: 'Jollof Rice',
    description: 'West African one-pot rice with tomatoes, peppers, and spices',
    price: 1200,
    image: '/images/items/jollof-rice.jpg',
    category: 'main-courses',
    isFeatured: true,
    isAvailable: true,
    dietaryTags: [
      { id: 'vegetarian', label: 'Vegetarian', value: 'vegetarian' },
      { id: 'gluten-free', label: 'Gluten Free', value: 'gluten-free' }
    ],
    modifiers: [
      {
        id: 'protein',
        name: 'Protein Addition',
        description: 'Add protein to your jollof rice',
        minSelection: 0,
        maxSelection: 2,
        options: [
          { id: 'chicken', label: 'Grilled Chicken', priceAdjustment: 300 },
          { id: 'beef', label: 'Stewed Beef', priceAdjustment: 350 },
          { id: 'fish', label: 'Fried Fish', priceAdjustment: 320 },
          { id: 'none', label: 'No Protein', priceAdjustment: 0, isDefault: true }
        ]
      },
      {
        id: 'heat-level',
        name: 'Heat Level',
        description: 'Choose pepper level',
        minSelection: 1,
        maxSelection: 1,
        options: [
          { id: 'none', label: 'No Pepper', priceAdjustment: 0, isDefault: true },
          { id: 'low', label: 'Low Pepper', priceAdjustment: 50 },
          { id: 'medium', label: 'Medium Pepper', priceAdjustment: 100 },
          { id: 'high', label: 'High Pepper', priceAdjustment: 150 }
        ]
      }
    ]
  }
  // Additional items would be defined similarly
};

export default function MenuItemDetailPage({ params }: { params: { itemId: string } }) {
  const { brandId } = useBrand();
  const router = useRouter();
  const pathname = usePathname();
  const { addItem } = useCartStore();
  const itemId = params.itemId;
  
  // Get item from mock data (would come from config in real app)
  const item = mockMenuItems[itemId];
  
  if (!item) {
    // Handle missing item - redirect to menu or show 404
    router.push('/menu');
    return null;
  }
  
  const menuItemJsonLd = getMenuItemJsonLd({
    id: item.id,
    name: item.name,
    description: item.description,
    image: item.image,
    price: item.basePrice,
    category: item.category,
    brand: brandId as 'folixx-bukka' | 'secrets-palace',
  });
  
  const [quantity, setQuantity] = useState(1);
  const [selectedModifiers, setSelectedModifiers] = useState<Record<string, string[]>>({});
  
  // Initialize default selections for modifier groups
  React.useEffect(() => {
    const initialSelections: Record<string, string[]> = {};
    item.modifiers.forEach(group => {
      const defaultOptions = group.options
        .filter(option => option.isDefault)
        .map(option => option.id);
      
      // If no defaults, select first option if minSelection > 0
      if (defaultOptions.length === 0 && group.minSelection > 0) {
        initialSelections[group.id] = [group.options[0].id];
      } else if (defaultOptions.length > 0) {
        initialSelections[group.id] = defaultOptions;
      }
    });
    setSelectedModifiers(initialSelections);
  }, [item]);
  
  // Calculate total price with modifiers
  const calculateTotalPrice = () => {
    let total = item.basePrice;
    
    Object.entries(selectedModifiers).forEach(([groupId, selectedOptionIds]) => {
      const group = item.modifiers.find(g => g.id === groupId);
      if (!group) return;
      
      selectedOptionIds.forEach(optionId => {
        const option = group.options.find(o => o.id === optionId);
        if (option) {
          total += option.priceAdjustment;
        }
      });
    });
    
    return total * quantity;
  };
  
  const handleAddToCart = () => {
    // Validate modifier selections
    let isValid = true;
    item.modifiers.forEach(group => {
      const selectedCount = selectedModifiers[group.id]?.length || 0;
      if (selectedCount < group.minSelection || 
          (group.maxSelection > 0 && selectedCount > group.maxSelection)) {
        isValid = false;
      }
    });
    
    if (!isValid) {
      alert('Please make valid selections for all modifier groups');
      return;
    }
    
    // Add to cart
    addItem({
      menuItemId: item.id,
      name: item.name,
      basePrice: item.basePrice,
      image: item.image,
      selectedModifiers,
      dietaryTags: item.dietaryTags
    }, quantity);
    
    // Show confirmation and reset
    alert(`${item.name} added to cart!`);
    setQuantity(1);
    
    // Reset to defaults
    item.modifiers.forEach(group => {
      const defaultOptions = group.options
        .filter(option => option.isDefault)
        .map(option => option.id);
      
      if (defaultOptions.length === 0 && group.minSelection > 0) {
        setSelectedModifiers(prev => ({
          ...prev,
          [group.id]: [group.options[0].id]
        }));
      } else if (defaultOptions.length > 0) {
        setSelectedModifiers(prev => ({
          ...prev,
          [group.id]: defaultOptions
        }));
      }
    });
  };
  
  return (
    <div className="min-h-screen bg-background text-text">
      <JsonLd jsonLd={menuItemJsonLd} />
      {/* Header */}
      <header className="bg-bg/90 backdrop-blur-sm p-6 border-b border-border/50">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="flex items-center space-x-4 mb-4">
            <button 
              onClick={() => router.back()}
              className="text-text-muted hover:text-text transition-colors"
            >
              ← Back to Menu
            </button>
            <h1 className="text-3xl font-bold text-text-brand">
              {brandId === 'folixx-bukka' ? 'Folixx Bukka' : 'Secrets Palace'}
            </h1>
          </div>
          
          <h1 className="text-4xl font-bold text-text mb-2">
            {item.name}
          </h1>
          <p className="text-text-muted max-w-xl text-center">
            {item.description}
          </p>
        </div>
      </header>

      {/* Item Detail */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
          
          {/* Image */}
          <div className="relative aspect-w-4 aspect-h-3">
            <Image 
              src={item.image} 
              alt={item.name} 
              fill 
              className="object-cover rounded-lg"
            />
            {item.isFeatured && (
              <div className="absolute -top-2 -left-2 bg-primary/20 
                      text-text-primary px-2 py-0.5 text-xs rounded">Featured</div>
            )}
            {!item.isAvailable && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="text-text-inverse text-sm">Unavailable</span>
              </div>
            )}
          </div>
          
          {/* Details */}
          <div className="space-y-6">
            
            {/* Price */}
            <div className="text-3xl font-bold text-text">
              ?{item.basePrice.toLocaleString()}
            </div>
            
            {/* Dietary Tags */}
            {item.dietaryTags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {item.dietaryTags.map(tag => (
                  <span 
                    key={tag.id} 
                    className="px-3 py-1 rounded-full text-xs font-medium 
                            bg-primary/10 text-primary"
                  >
                    {tag.label}
                  </span>
                ))}
              </div>
            )}
            
            {/* Modifier Groups */}
            {item.modifiers.length > 0 && (
              <>
                <h2 className="text-xl font-semibold text-text">
                  Customize Your Order
                </h2>
                <div className="space-y-4">
                  {item.modifiers.map(group => (
                    <div key={group.id} className="border border-border/50 rounded-lg p-4">
                      <h3 className="text-lg font-medium text-text mb-3">
                        {group.name}
                      </h3>
                      <p className="text-text-sm text-text-muted mb-4">
                        {group.description}
                      </p>
                      <div className="space-y-2">
                        {group.options.map(option => (
                          <div 
                            key={option.id} 
                            className="flex items-start space-x-3"
                          >
                            <input
                              type={group.maxSelection > 1 ? 'checkbox' : 'radio'}
                              id={`${item.id}-${group.id}-${option.id}`}
                              checked={selectedModifiers[group.id]?.includes(option.id) || false}
                              onChange={(e) => {
                                setSelectedModifiers(prev => {
                                  const isChecked = e.target.checked;
                                  const currentSelection = prev[group.id] || [];
                                  
                                  let newSelection = [...currentSelection];
                                  if (isChecked) {
                                    newSelection = [...newSelection, option.id];
                                  } else {
                                    newSelection = newSelection.filter(id => id !== option.id);
                                  }
                                  
                                  // Validate selection constraints
                                  const selectedCount = newSelection.length;
                                  if (selectedCount < group.minSelection) {
                                    // Don't allow unselecting below minimum
                                    return prev;
                                  }
                                  if (group.maxSelection > 0 && selectedCount > group.maxSelection) {
                                    // Don't allow selecting above maximum
                                    return prev;
                                  }
                                  
                                  return {
                                    ...prev,
                                    [group.id]: newSelection
                                  };
                                }}
                              />
                            >
                            <label 
                              htmlFor={`${item.id}-${group.id}-${option.id}`}
                              className="flex items-center space-x-2 cursor-select-text"
                            >
                              <span className="font-medium text-text">
                                {option.label}
                              </span>
                              {option.priceAdjustment !== 0 && (
                                <span className="text-text-sm text-text-muted">
                                  {option.priceAdjustment > 0 
                                    ? `+?${option.priceAdjustment.toLocaleString()}` 
                                    : `-?${Math.abs(option.priceAdjustment).toLocaleString()}`}
                                </span>
                              )}
                            </label>
                          </div>
                        ))}
                      </div>
                      
                      {/* Validation message */}
                      {selectedModifiers[group.id] && (
                        selectedModifiers[group.id].length < group.minSelection ||
                        (group.maxSelection > 0 && selectedModifiers[group.id].length > group.maxSelection)
                      ) && (
                        <p className="text-sm text-destructive">
                          {group.maxSelection > 0 
                            ? `Please select between ${group.minSelection} and ${group.maxSelection} options`
                            : `Please select at least ${group.minSelection} options`}
                        </p>
                      )}
                    }
                  ))}
                </div>
              </>
            )}
            
            {/* Quantity Selector */}
            <div className="flex items-center space-x-4 pt-4 border-t border-border/50">
              <button
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))
                className="flex h-10 w-10 items-center justify-center rounded-lg 
                          border border-border/50 hover:bg-muted/50 transition-colors"
                disabled={quantity <= 1}
              >
                –
              </button>
              <span className="font-mono text-xl">{quantity}</span>
              <button
                onClick={() => setQuantity(prev => prev + 1)
                className="flex h-10 w-10 items-center justify-center rounded-lg 
                          border border-border/50 hover:bg-muted/50 transition-colors"
              >
                +
              </button>
            </div>
            
            {/* Total Price */}
            <div className="mt-4 pt-4 border-t border-border/50">
              <div className="flex justify-between items-baseline">
                <span className="text-lg font-medium text-text">
                  Total:
                </span>
                <span className="text-2xl font-bold text-text">
                  ?{calculateTotalPrice().toLocaleString()}
                </span>
              </div>
            </div>
            
            {/* Add to Cart Button */}
            <Button
              variant="primary"
              size="lg"
              className="w-full mt-6"
              onClick={handleAddToCart}
              disabled={!item.isAvailable}
            >
              {item.isAvailable ? 'Add to Cart' : 'Unavailable'}
            </Button>
          </div>
        </div>
      </main>

      {/* Footer Call to Action */}
      <footer className="bg-bg/50 backdrop-blur-sm p-8 border-t border-border/50">
        <div className="max-w-7xl mx-auto text-center">
          <Button
            variant="secondary"
            size="lg"
            href="/menu"
          >
            Browse More Menu Items
          </Button>
          <Button
            variant="primary"
            size="lg"
            href="/cart"
            className="ml-4"
          >
            View Cart
          </Button>
        </div>
      </footer>
    </div>
  );
}