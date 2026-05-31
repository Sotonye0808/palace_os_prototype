import { Image } from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/shared/Button';
import { useBrand } from '@/src/contexts/BrandContext';
import { useState } from 'react';

// Import our menu types
import { MenuItem, MenuCategory, DietaryTag, ModifierGroup, Bundle } from '@/src/types/menu';

// Types
interface FilterState {
  dietary: string[];
  sort: string; // price-low, price-high, name-az, name-za
}

// Mock menu data with dietary tags and modifiers (will be replaced with data from config/system)
const mockMenuData: MenuCategory[] = [
  {
    id: 'appetizers',
    name: 'Appetizers',
    description: 'Start your meal with our delicious appetizers',
    image: '/images/categories/appetizers.jpg',
    items: [
      {
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
          }
        ]
      },
      {
        id: 'spring-rolls',
        name: 'Vegetable Spring Rolls',
        description: 'Crispy rolls filled with fresh vegetables',
        price: 400,
        image: '/images/items/spring-rolls.jpg',
        category: 'appetizers',
        isAvailable: true,
        dietaryTags: [
          { id: 'vegetarian', label: 'Vegetarian', value: 'vegetarian' },
          { id: 'vegan', label: 'Vegan', value: 'vegan' },
          { id: 'gluten-free', label: 'Gluten Free', value: 'gluten-free' }
        ],
        modifiers: [
          {
            id: 'dipping-sauce',
            name: 'Dipping Sauce',
            description: 'Choose your dipping sauce',
            minSelection: 0,
            maxSelection: 2,
            options: [
              { id: 'sweet-chili', label: 'Sweet Chili', priceAdjustment: 0 },
              { id: 'peanut', label: 'Peanut Sauce', priceAdjustment: 0 },
              { id: 'soy', label: 'Soy Sauce', priceAdjustment: 0 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'main-courses',
    name: 'Main Courses',
    description: 'Hearty main dishes to satisfy your hunger',
    image: '/images/categories/main-courses.jpg',
    items: [
      {
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
      },
      {
        id: 'egusi-soup',
        name: 'Egusi Soup',
        description: 'Melon seed soup with leafy vegetables and assorted meat',
        price: 1500,
        image: '/images/items/egusi-soup.jpg',
        category: 'main-courses',
        isAvailable: true,
        dietaryTags: [
          { id: 'halal', label: 'Halal', value: 'halal' }
        ],
        modifiers: [
          {
            id: 'protein-type',
            name: 'Protein Type',
            description: 'Select your preferred protein',
            minSelection: 1,
            maxSelection: 1,
            options: [
              { id: 'beef', label: 'Beef', priceAdjustment: 0, isDefault: true },
              { id: 'goat', label: 'Goat', priceAdjustment: 200 },
              { id: 'fish', label: 'Fish', priceAdjustment: 150 },
              { id: 'chicken', label: 'Chicken', priceAdjustment: 100 }
            ]
          },
          {
            id: 'thickness',
            name: 'Soup Thickness',
            description: 'Choose soup consistency',
            minSelection: 1,
            maxSelection: 1,
            options: [
              { id: 'light', label: 'Light', priceAdjustment: 0, isDefault: true },
              { id: 'medium', label: 'Medium', priceAdjustment: 50 },
              { id: 'thick', label: 'Thick', priceAdjustment: 100 }
            ]
          }
        ]
      },
      {
        id: 'suya',
        name: 'Spicy Suya',
        description: 'Grilled skewered meat with peanut sauce',
        price: 800,
        image: '/images/items/suya.jpg',
        category: 'main-courses',
        isAvailable: true,
        dietaryTags: [
          { id: 'halal', label: 'Halal', value: 'halal' }
        ],
        modifiers: [
          {
            id: 'meat-type',
            name: 'Meat Type',
            description: 'Select your preferred meat',
            minSelection: 1,
            maxSelection: 1,
            options: [
              { id: 'beef', label: 'Beef', priceAdjustment: 0, isDefault: true },
              { id: 'chicken', label: 'Chicken', priceAdjustment: 50 },
              { id: 'goat', label: 'Goat', priceAdjustment: 100 }
            ]
          },
          {
            id: 'spice-level',
            name: 'Spice Level',
            description: 'Choose spice intensity',
            minSelection: 1,
            maxSelection: 1,
            options: [
              { id: 'mild', label: 'Mild', priceAdjustment: 0 },
              { id: 'medium', label: 'Medium', priceAdjustment: 100, isDefault: true },
              { id: 'hot', label: 'Hot', priceAdjustment: 200 },
              { id: 'extra-hot', label: 'Extra Hot', priceAdjustment: 300 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'desserts',
    name: 'Desserts',
    description: 'Sweet treats to end your meal',
    image: '/images/categories/desserts.jpg',
    items: [
      {
        id: 'chin-chin',
        name: 'Chin Chin',
        description: 'Sweet fried dough pastry',
        price: 300,
        image: '/images/items/chin-chin.jpg',
        category: 'desserts',
        isAvailable: true,
        dietaryTags: [
          { id: 'vegetarian', label: 'Vegetarian', value: 'vegetarian' },
          { id: 'vegan', label: 'Vegan', value: 'vegan' },
          { id: 'gluten-free', label: 'Gluten Free', value: 'gluten-free' }
        ],
        modifiers: [
          {
            id: 'serving-style',
            name: 'Serving Style',
            description: 'Choose how to serve',
            minSelection: 1,
            maxSelection: 1,
            options: [
              { id: 'regular', label: 'Regular', priceAdjustment: 0, isDefault: true },
              { id: 'with-ice-cream', label: 'With Ice Cream', priceAdjustment: 100 },
              { id: 'with-chocolate', label: 'With Chocolate Sauce', priceAdjustment: 150 }
            ]
          }
        ]
      },
      {
        id: 'ice-cream',
        name: 'Local Ice Cream',
        description: 'Creamy ice cream with Nigerian flavors',
        price: 400,
        image: '/images/items/ice-cream.jpg',
        category: 'desserts',
        isAvailable: true,
        dietaryTags: [
          { id: 'vegetarian', label: 'Vegetarian', value: 'vegetarian' }
        ],
        modifiers: [
          {
            id: 'flavor',
            name: 'Flavor',
            description: 'Choose your flavor',
            minSelection: 1,
            maxSelection: 2,
            options: [
              { id: 'vanilla', label: 'Vanilla', priceAdjustment: 0, isDefault: true },
              { id: 'chocolate', label: 'Chocolate', priceAdjustment: 50 },
              { id: 'strawberry', label: 'Strawberry', priceAdjustment: 50 },
              { id: 'mango', label: 'Mango', priceAdjustment: 50 },
              { id: 'pistachio', label: 'Pistachio', priceAdjustment: 75 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'beverages',
    name: 'Beverages',
    description: 'Refreshing drinks and cocktails',
    image: '/images/categories/beverages.jpg',
    items: [
      {
        id: 'zobo',
        name: 'Zobo Drink',
        description: 'Refreshing hibiscus drink',
        price: 250,
        image: '/images/items/zobo.jpg',
        category: 'beverages',
        isAvailable: true,
        dietaryTags: [
          { id: 'vegetarian', label: 'Vegetarian', value: 'vegetarian' },
          { id: 'vegan', label: 'Vegan', value: 'vegan' },
          { id: 'gluten-free', label: 'Gluten Free', value: 'gluten-free' }
        ],
        modifiers: [
          {
            id: 'sweetness',
            name: 'Sweetness Level',
            description: 'Choose sweetness level',
            minSelection: 1,
            maxSelection: 1,
            options: [
              { id: 'unsweetened', label: 'Unsweetened', priceAdjustment: 0 },
              { id: 'low', label: 'Low Sugar', priceAdjustment: 0, isDefault: true },
              { id: 'medium', label: 'Medium Sweet', priceAdjustment: 50 },
              { id: 'high', label: 'Highly Sweet', priceAdjustment: 100 }
            ]
          }
        ]
      },
      {
        id: 'kunu',
        name: 'Kunu Drink',
        description: 'Millet-based refreshing drink',
        price: 250,
        image: '/images/items/kunu.jpg',
        category: 'beverages',
        isAvailable: true,
        dietaryTags: [
          { id: 'vegetarian', label: 'Vegetarian', value: 'vegetarian' },
          { id: 'vegan', label: 'Vegan', value: 'vegan' },
          { id: 'gluten-free', label: 'Gluten Free', value: 'gluten-free' }
        ],
        modifiers: [
          {
            id: 'serving-temperature',
            name: 'Serving Temperature',
            description: 'Choose serving temperature',
            minSelection: 1,
            maxSelection: 1,
            options: [
              { id: 'cold', label: 'Cold', priceAdjustment: 0, isDefault: true },
              { id: 'room-temp', label: 'Room Temperature', priceAdjustment: 0 },
              { id: 'warm', label: 'Warm', priceAdjustment: 50 }
            ]
          }
        ]
      }
    ]
  }
];

export default function MenuPage() {
  const { brandId } = useBrand();
  
  return (
    <div className=\"min-h-screen bg-background text-text\">
      {/* Header */}
      <header className=\"bg-bg/90 backdrop-blur-sm p-6 border-b border-border/50\">
        <div className=\"max-w-7xl mx-auto flex flex-col items-center\">
          <h1 className=\"text-4xl font-bold text-text-brand mb-2\">
            {brandId === 'folixx-bukka' ? 'Folixx Bukka Menu' : 'Secrets Palace Menu'}
          </h1>
          <p className=\"text-text-muted max-w-xl text-center\">
            Discover our authentic Nigerian cuisine with a modern twist
          </p>
        </div>
      </header>

      {/* Menu Categories */}
      <main className=\"max-w-7xl mx-auto px-4 py-12\">
        <div className=\"space-y-8\">
          {mockMenuData.map((category) => (
            <section key={category.id} className=\"space-y-4\">
              <div className=\"flex items-center space-x-4\">
                <Image 
                  src={category.image} 
                  alt={category.name} 
                  width={80} 
                  height={80} 
                  className=\"rounded-lg object-cover\"
                />
                <div>
                  <h2 className=\"text-2xl font-semibold text-text\">
                    {category.name}
                  </h2>
                  <p className=\"text-text-muted\">
                    {category.description}
                  </p>
                </div>
              </div>
              
              {/* Menu Items Grid */}
              <div className=\"grid gap-6\">
                {/* Bukka: 2 columns on mobile, 3 on tablet, 4 on desktop */}
                {/* Palace: 1 column on mobile, 2 on tablet, 3 on desktop (more luxurious feel) */}
                <div className=\"grid gap-4 
                            sm:grid-cols-2 
                            md:grid-cols-3 
                            lg:grid-cols-[{brandId === 'folixx-bukka' ? '4' : '3'}]\">
                  {category.items.map((item) => (
                    <Link 
                      key={item.id} 
                      href=\"/menu/[itemId]\" 
                      asItem={{ itemId: item.id }}
                      className=\"group\"
                    >
                      <div className=\"bg-card rounded-xl border border-border/50 
                                    hover:border-border/70 
                                    hover:shadow-lg 
                                    transition-all 
                                    flex flex-col h-full\">
                        {item.isFeatured && (
                          <div className=\"absolute -top-2 -left-2 bg-primary/20 
                                    text-text-primary px-2 py-0.5 text-xs rounded\">Featured</div>
                        )}
                        
                        <div className=\"relative aspect-w-4 aspect-h-3 overflow-hidden rounded-t-lg\">{'\n'}
                          <Image 
                            src={item.image} 
                            alt={item.name} 
                            fill 
                            className=\"object-cover transition-transform duration-300 group-hover:scale-105\" 
                          />
                          {!item.isAvailable && (
                            <div className=\"absolute inset-0 bg-black/40 flex items-center justify-center\">\n                              <span className=\"text-text-inverse text-sm\">Unavailable</span>\n                            </div>\n                          )}
                        </div>
                        
                        <div className=\"flex-1 px-4 py-4 flex flex-col\">\n                          <h3 className=\"text-lg font-medium text-text line-clamp-2\">\n                            {item.name}\n                          </h3>\n                          <p className=\"mt-2 text-text-sm text-text-muted line-clamp-3 flex-1\">\n                            {item.description}\n                          </p>\n                          <div className=\"mt-4 flex items-baseline space-x-2\">\n                            <span className=\"font-semibold text-text\">?{item.price.toLocaleString()}</span>\n                            <Button\n                              variant=\"primary\"\n                              size=\"sm\"\n                              className=\"ml-auto\"\n                              disabled={!item.isAvailable}\n                            >\n                              Add to Cart\n                            </Button>\n                          </div>\n                        </div>\n                      </div>\n                    </Link>\n                  ))}\n                </div>\n              </section>\n            ))}\n          </div>\n        </main>\n\n        {/* Footer Call to Action */}\n        <footer className=\"bg-bg/50 backdrop-blur-sm p-8 border-t border-border/50\">\n          <div className=\"max-w-7xl mx-auto text-center\">\n            <h3 className=\"text-2xl font-semibold mb-4\">\n              Ready to order?\n            </h3>\n            <p className=\"text-text-muted mb-6 max-w-2xl mx-auto\">\n              Our menu features authentic Nigerian dishes made with fresh, locally-sourced ingredients.\n            </p>\n            <Button\n              variant=\"primary\"\n              size=\"lg\"\n              href=\"/cart\"\n            >\n              View Cart\n            </Button>\n          </div>\n        </footer>\n      </div>\n    )\n  );\n}\n\n// Mock bundles data (will be replaced with data from config/system)\nconst mockBundles: Bundle[] = [\n  {\n    id: 'family-feast',\n    name: 'Family Feast Bundle',\n    description: 'Enough food for the whole family - 2 mains, 4 sides, and 2 drinks',\n    price: 5500,\n    items: [\n      { menuItemId: 'jollof-rice', quantity: 2 },\n      { menuItemId: 'egusi-soup', quantity: 2 },\n      { menuItemId: 'fried-plantains', quantity: 4 },\n      { menuItemId: 'zobo', quantity: 2 }\n    ]\n  },\n  {\n    id: 'date-night',\n    name: 'Date Night Special',\n    description: 'Romantic dinner for two with dessert and drinks',\n    price: 4200,\n    items: [\n      { menuItemId: 'suya', quantity: 2 },\n      { menuItemId: 'egusi-soup', quantity: 2 },\n      { menuItemId: 'chin-chin', quantity: 2 },\n      { menuItemId: 'kunu', quantity: 2 }\n    ]\n  },\n  {\n    id: 'lunch-combo',\n    name: 'Quick Lunch Combo',\n    description: 'Main dish, side, and drink for a quick lunch',\n    price: 1800,\n    items: [\n      { menuItemId: 'jollof-rice', quantity: 1 },\n      { menuItemId: 'samosa', quantity: 2 },\n      { menuItemId: 'zobo', quantity: 1 }\n    ]\n  }\n];\n\nfunction calculateBundleSavings(bundle: Bundle): number {\n  // In a real implementation, we would look up the actual prices of the items\n  // For now, we'll return a mock savings amount\n  return Math.round(bundle.price * 0.2); // Assume 20% savings\n}
