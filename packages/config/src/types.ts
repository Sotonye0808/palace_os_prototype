// Core configuration types for Palace OS
export interface BrandConfig {
  id: string;
  name: string;
  slug: string;
  primaryColor: string;
  secondaryColor: string;
  logo: string;
  enabled: boolean;
}

export interface MenuConfig {
  categories: MenuCategory[];
  featuredItems: string[]; // MenuItem IDs
  taxRate: number;
  serviceCharge: number;
}

export interface VenueConfig {
  tables: Table[];
  zones: VenueZone[];
  operatingHours: Record<string, { open: string; close: string }>;
}

export interface LoyaltyConfig {
  tiers: LoyaltyTier[];
  pointsPerCurrency: number;
  currencyPerPoint: number;
}

export interface NotificationConfig {
  email: {
    enabled: boolean;
    from: string;
    templates: Record<string, string>;
  };
  sms: {
    enabled: boolean;
    from: string;
    templates: Record<string, string>;
  };
  push: {
    enabled: boolean;
    vapidKey: string;
  };
}

export interface AnalyticsConfig {
  enabled: boolean;
  providers: {
    posthog: {
      enabled: boolean;
      apiKey: string;
    };
    google: {
      enabled: boolean;
      measurementId: string;
    };
  };
}

export interface AppConfig {
  brandConfig: BrandConfig[];
  menuConfig: MenuConfig;
  venueConfig: VenueConfig;
  loyaltyConfig: LoyaltyConfig;
  notificationConfig: NotificationConfig;
  analyticsConfig: AnalyticsConfig;
}

// Supporting types
export interface MenuCategory {
  id: string;
  name: string;
  description: string;
  image: string;
  sortOrder: number;
}

export interface Table {
  id: string;
  name: string;
  capacity: number;
  zoneId: string;
  shape: 'round' | 'square' | 'rectangle';
  x: number;
  y: number;
}

export interface VenueZone {
  id: string;
  name: string;
  description: string;
  color: string;
}

export interface LoyaltyTier {
  id: string;
  name: string;
  minPoints: number;
  benefits: string[];
  discountPercentage: number;
}
