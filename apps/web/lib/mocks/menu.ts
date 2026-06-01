import { MenuItem, MenuCategory } from '@/lib/types/menu';
import { placeholder } from '@/lib/utils/placeholder';

export const mockMenuCategories: MenuCategory[] = [
  {
    id: 'appetizers',
    name: 'Appetizers',
    description: 'Start your meal with our delicious appetizers',
    image: placeholder('appetizers', 800, 400),
    items: [
      {
        id: 'samosa',
        name: 'Spicy Samosa',
        description: 'Crispy pastry filled with spiced potatoes and peas',
        price: 500,
        image: placeholder('samosa', 400, 300),
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
      {
        id: 'spring-rolls',
        name: 'Vegetable Spring Rolls',
        description: 'Crispy rolls filled with fresh vegetables',
        price: 400,
        image: placeholder('spring-rolls', 400, 300),
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
    image: placeholder('main-courses', 800, 400),
    items: [
      {
        id: 'jollof-rice',
        name: 'Jollof Rice',
        description: 'West African one-pot rice with tomatoes, peppers, and spices',
        price: 1200,
        image: placeholder('jollof-rice', 400, 300),
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
        image: placeholder('egusi-soup', 400, 300),
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
        image: placeholder('suya', 400, 300),
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
    image: placeholder('desserts', 800, 400),
    items: [
      {
        id: 'chin-chin',
        name: 'Chin Chin',
        description: 'Sweet fried dough pastry',
        price: 300,
        image: placeholder('chin-chin', 400, 300),
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
        image: placeholder('ice-cream', 400, 300),
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
    image: placeholder('beverages', 800, 400),
    items: [
      {
        id: 'zobo',
        name: 'Zobo Drink',
        description: 'Refreshing hibiscus drink',
        price: 250,
        image: placeholder('zobo', 400, 300),
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
        image: placeholder('kunu', 400, 300),
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

export function getMenuItemById(id: string): MenuItem | undefined {
  for (const category of mockMenuCategories) {
    const item = category.items.find(i => i.id === id);
    if (item) return item;
  }
  return undefined;
}

export function getMockMenuItemsRecord(): Record<string, MenuItem> {
  const record: Record<string, MenuItem> = {};
  for (const category of mockMenuCategories) {
    for (const item of category.items) {
      record[item.id] = item;
    }
  }
  return record;
}
