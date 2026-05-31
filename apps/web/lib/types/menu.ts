// Menu-related TypeScript interfaces following metadata-driven architecture

export interface DietaryTag {
  id: string;
  label: string;
  value: string;
}

export interface ModifierOption {
  id: string;
  label: string;
  priceAdjustment: number; // Positive or negative adjustment to base price
  isDefault?: boolean;
}

export interface ModifierGroup {
  id: string;
  name: string;
  description: string;
  minSelection: number; // Minimum number of options that must be selected
  maxSelection: number; // Maximum number of options that can be selected (0 for unlimited)
  options: ModifierOption[];
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number; // Base price
  image: string;
  category: string;
  isFeatured?: boolean;
  isAvailable: boolean;
  dietaryTags: DietaryTag[]; // e.g., [{id: 'vegetarian', label: 'Vegetarian', value: 'vegetarian'}]
  modifiers: ModifierGroup[]; // Groups of modifiers that can be applied to this item
  // Additional metadata for extensibility
  metadata?: Record<string, any>;
}

export interface MenuCategory {
  id: string;
  name: string;
  description: string;
  image: string;
  sortOrder: number;
  items: MenuItem[];
}

export interface Bundle {
  id: string;
  name: string;
  description: string;
  price: number; // Bundle price (may be discounted vs individual items)
  items: { menuItemId: string; quantity: number }[];
  // Note: Bundles could include default modifiers for items, but we'll handle that in the cart logic
}

export interface MenuConfig {
  categories: MenuCategory[];
  featuredItems: string[]; // MenuItem IDs
  bundles: Bundle[]; // New: Package/deal bundling system
  taxRate: number;
  serviceCharge: number;
  // Hardcoded fallbacks ensure the app never fails to render
}

// Cart item with selected modifiers
export interface CartItem {
  menuItemId: string;
  name: string;
  basePrice: number;
  quantity: number;
  image?: string;
  selectedModifiers: {
    [modifierGroupId: string]: string[]; // modifierGroupId -> array of selected option IDs
  };
  dietaryTags: DietaryTag[]; // Inherited from menu item for display purposes
  totalPrice: number; // Base price + modifier adjustments * quantity
  bundleId?: string; // If this item is part of a bundle, the bundle ID
  bundleName?: string; // For display purposes
}