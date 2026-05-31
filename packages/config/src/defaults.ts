// Hardcoded fallback configurations for Palace OS
// These ensure the app never fails to render even if CMS is unavailable

import type { AppConfig, BrandConfig, MenuConfig, VenueConfig, LoyaltyConfig, NotificationConfig, AnalyticsConfig } from './types';

// Fallback brand configurations
export const fallbackBrandConfig: BrandConfig[] = [
  {
    id: 'bukka',
    name: 'Folixx Bukka',
    slug: 'bukka',
    primaryColor: '#8B4513', // SaddleBrown
    secondaryColor: '#DEB887', // BurlyWood
    logo: '/logos/bukka.png',
    enabled: true
  },
  {
    id: 'palace',
    name: 'Secrets Palace',
    slug: 'palace',
    primaryColor: '#2F4F4F', // DarkSlateGray
    secondaryColor: '#B0C4DE', // LightSteelBlue
    logo: '/logos/palace.png',
    enabled: true
  }
];

// Fallback menu configuration for Bukka
export const fallbackMenuConfig: MenuConfig = {
  categories: [
    {
      id: 'appetizers',
      name: 'Appetizers',
      description: 'Start your meal with our delicious appetizers',
      image: '/images/categories/appetizers.jpg',
      sortOrder: 1
    },
    {
      id: 'main-courses',
      name: 'Main Courses',
      description: 'Hearty main dishes to satisfy your hunger',
      image: '/images/categories/main-courses.jpg',
      sortOrder: 2
    },
    {
      id: 'desserts',
      name: 'Desserts',
      description: 'Sweet treats to end your meal',
      image: '/images/categories/desserts.jpg',
      sortOrder: 3
    },
    {
      id: 'beverages',
      name: 'Beverages',
      description: 'Refreshing drinks and cocktails',
      image: '/images/categories/beverages.jpg',
      sortOrder: 4
    }
  ],
  featuredItems: [],
  bundles: [
    {
      id: 'family-feast',
      name: 'Family Feast Bundle',
      description: 'Enough food for the whole family - 2 mains, 4 sides, and 2 drinks',
      price: 5500, // Discounted price vs buying individually
      items: [
        { menuItemId: 'jollof-rice', quantity: 2 },
        { menuItemId: 'egusi-soup', quantity: 2 },
        { menuItemId: 'fried-plantains', quantity: 4 },
        { menuItemId: 'zobo', quantity: 2 }
      ]
    },
    {
      id: 'date-night',
      name: 'Date Night Special',
      description: 'Romantic dinner for two with dessert and drinks',
      price: 4200, // Discounted price
      items: [
        { menuItemId: 'suya', quantity: 2 },
        { menuItemId: 'egusi-soup', quantity: 2 },
        { menuItemId: 'chin-chin', quantity: 2 },
        { menuItemId: 'kunu', quantity: 2 }
      ]
    },
    {
      id: 'lunch-combo',
      name: 'Quick Lunch Combo',
      description: 'Main dish, side, and drink for a quick lunch',
      price: 1800, // Discounted price
      items: [
        { menuItemId: 'jollof-rice', quantity: 1 },
        { menuItemId: 'samosa', quantity: 2 },
        { menuItemId: 'zobo', quantity: 1 }
      ]
    }
  ],
  taxRate: 0.075, // 7.5%
  serviceCharge: 0.10 // 10%
};

// Fallback venue configuration for Palace
export const fallbackVenueConfig: VenueConfig = {
  tables: [
    {
      id: 'table-1',
      name: 'Table 1',
      capacity: 4,
      zoneId: 'main-floor',
      shape: 'round',
      x: 100,
      y: 100
    },
    {
      id: 'table-2',
      name: 'Table 2',
      capacity: 4,
      zoneId: 'main-floor',
      shape: 'round',
      x: 200,
      y: 100
    },
    {
      id: 'table-3',
      name: 'Table 3',
      capacity: 6,
      zoneId: 'main-floor',
      shape: 'rectangle',
      x: 150,
      y: 200
    },
    {
      id: 'table-4',
      name: 'Table 4',
      capacity: 8,
      zoneId: 'vip',
      shape: 'rectangle',
      x: 300,
      y: 150
    }
  ],
  zones: [
    {
      id: 'main-floor',
      name: 'Main Floor',
      description: 'Main dining area',
      color: '#3B82F6' // Blue-500
    },
    {
      id: 'vip',
      name: 'VIP Section',
      description: 'Exclusive VIP dining area',
      color: '#8B5CF6' // Violet-500
    },
    {
      id: 'terrace',
      name: 'Outdoor Terrace',
      description: 'Alfresco dining area',
      color: '#10B981' // Emerald-500
    }
  ],
  operatingHours: {
    monday: { open: '11:00', close: '23:00' },
    tuesday: { open: '11:00', close: '23:00' },
    wednesday: { open: '11:00', close: '23:00' },
    thursday: { open: '11:00', close: '23:00' },
    friday: { open: '11:00', close: '00:00' },
    saturday: { open: '11:00', close: '00:00' },
    sunday: { open: '12:00', close: '22:00' }
  }
};

// Fallback loyalty configuration (shared between brands)
export const fallbackLoyaltyConfig: LoyaltyConfig = {
  tiers: [
    {
      id: 'bronze',
      name: 'Bronze Member',
      minPoints: 0,
      benefits: ['Welcome drink on first visit', 'Birthday discount'],
      discountPercentage: 0
    },
    {
      id: 'silver',
      name: 'Silver Member',
      minPoints: 500,
      benefits: ['10% off food', 'Priority reservation', 'Free dessert monthly'],
      discountPercentage: 10
    },
    {
      id: 'gold',
      name: 'Gold Member',
      minPoints: 1500,
      benefits: ['15% off food & drinks', 'Complimentary appetizer', 'Birthday cake'],
      discountPercentage: 15
    },
    {
      id: 'platinum',
      name: 'Platinum Member',
      minPoints: 3000,
      benefits: ['20% off everything', 'Free bottle of wine', 'Private dining access'],
      discountPercentage: 20
    }
  ],
  pointsPerCurrency: 10, // 10 points per  spent
  currencyPerPoint: 0.1 // .10 per point
};

// Fallback notification configuration
export const fallbackNotificationConfig: NotificationConfig = {
  email: {
    enabled: true,
    from: 'notifications@palaceos.com',
    templates: {
      welcome: 'Welcome to Palace OS!',
      reservation_confirmed: 'Your reservation has been confirmed',
      order_ready: 'Your order is ready for pickup',
      loyalty_update: 'Your loyalty points have been updated'
    }
  },
  sms: {
    enabled: true,
    from: 'PALACEOS',
    templates: {
      welcome: 'Welcome to Palace OS! Enjoy your visit.',
      reservation_confirmed: 'Reservation confirmed for {date} at {time}',
      order_ready: 'Your order #{orderId} is ready for pickup'
    }
  },
  push: {
    enabled: true,
    vapidKey: 'PLACEHOLDER_VAPID_KEY'
  }
};

// Fallback analytics configuration
export const fallbackAnalyticsConfig: AnalyticsConfig = {
  enabled: true,
  providers: {
    posthog: {
      enabled: false,
      apiKey: ''
    },
    google: {
      enabled: false,
      measurementId: ''
    }
  }
};

// Main fallback app configuration
export const fallbackAppConfig: AppConfig = {
  brandConfig: fallbackBrandConfig,
  menuConfig: fallbackMenuConfig,
  venueConfig: fallbackVenueConfig,
  loyaltyConfig: fallbackLoyaltyConfig,
  notificationConfig: fallbackNotificationConfig,
  analyticsConfig: fallbackAnalyticsConfig
};
