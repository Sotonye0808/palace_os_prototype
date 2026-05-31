// CMS Service for Palace OS
// Fetches and manages configuration objects from the database
// Implements the metadata-driven architecture pattern

import { supabase } from '@/lib/auth/supabase';
import type { 
  AppConfig, BrandConfig, MenuConfig, VenueConfig, 
  LoyaltyConfig, NotificationConfig, AnalyticsConfig,
  MenuCategory, Table, VenueZone, LoyaltyTier
} from '@/packages/config/src/types';

export class CMSService {
  private cache: AppConfig | null = null;
  private cacheTimestamp: number = 0;
  private readonly CACHE_TTL = 5 * 60 * 1000; // 5 minutes

  /**
   * Fetch the complete app configuration from the database
   * Uses caching to reduce database calls
   */
  async getAppConfig(): Promise<AppConfig> {
    const now = Date.now();
    
    // Return cached config if still valid
    if (this.cache && (now - this.cacheTimestamp) < this.CACHE_TTL) {
      return this.cache;
    }

    try {
      // Fetch all configuration objects in parallel
      const [
        brandConfigs,
        menuConfig,
        venueConfig,
        loyaltyConfig,
        notificationConfig,
        analyticsConfig
      ] = await Promise.all([
        this.fetchBrandConfigs(),
        this.fetchMenuConfig(),
        this.fetchVenueConfig(),
        this.fetchLoyaltyConfig(),
        this.fetchNotificationConfig(),
        this.fetchAnalyticsConfig()
      ]);

      // Construct the app config
      const appConfig: AppConfig = {
        brandConfig: brandConfigs,
        menuConfig: menuConfig || this.getFallbackMenuConfig(),
        venueConfig: venueConfig || this.getFallbackVenueConfig(),
        loyaltyConfig: loyaltyConfig || this.getFallbackLoyaltyConfig(),
        notificationConfig: notificationConfig || this.getFallbackNotificationConfig(),
        analyticsConfig: analyticsConfig || this.getFallbackAnalyticsConfig()
      };

      // Update cache
      this.cache = appConfig;
      this.cacheTimestamp = now;

      return appConfig;
    } catch (error) {
      console.error('Failed to fetch CMS configuration:', error);
      // Return fallback configuration on error
      return this.getFallbackAppConfig();
    }
  }

  /**
   * Fetch brand configurations
   */
  private async fetchBrandConfigs(): Promise<BrandConfig[]> {
    const { data, error } = await supabase
      .from('brand_configs')
      .select('*')
      .order('created_at');

    if (error) {
      console.error('Failed to fetch brand configs:', error);
      return this.getFallbackBrandConfigs();
    }

    // Transform database objects to BrandConfig type
    return data.map(config => ({
      id: config.brand_id,
      name: config.name,
      slug: config.slug,
      primaryColor: config.primary_color,
      secondaryColor: config.secondary_color,
      logo: config.logo || '',
      enabled: config.enabled
    }));
  }

  /**
   * Fetch menu configuration for a specific brand
   */
  private async fetchMenuConfig(brandId: string = 'bukka'): Promise<MenuConfig | null> {
    const { data, error } = await supabase
      .from('menu_configs')
      .select('*')
      .eq('brand_id', brandId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') { // No rows returned
        return null;
      }
      console.error('Failed to fetch menu config:', error);
      return null;
    }

    // Transform database object to MenuConfig type
    return {
      categories: data.categories || [],
      featuredItems: data.featuredItems || [],
      taxRate: data.tax_rate || 0.075,
      serviceCharge: data.service_charge || 0.10,
      bundles: data.bundles || []
    };
  }

  /**
   * Fetch venue configuration for a specific brand
   */
  private async fetchVenueConfig(brandId: string = 'palace'): Promise<VenueConfig | null> {
    const { data, error } = await supabase
      .from('venue_configs')
      .select('*')
      .eq('brand_id', brandId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') { // No rows returned
        return null;
      }
      console.error('Failed to fetch venue config:', error);
      return null;
    }

    // Transform database object to VenueConfig type
    return {
      tables: data.tables || [],
      zones: data.zones || [],
      operatingHours: data.operating_hours || {}
    };
  }

  /**
   * Fetch loyalty configuration for a specific brand
   */
  private async fetchLoyaltyConfig(brandId: string = 'bukka'): Promise<LoyaltyConfig | null> {
    const { data, error } = await supabase
      .from('loyalty_configs')
      .select('*')
      .eq('brand_id', brandId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') { // No rows returned
        return null;
      }
      console.error('Failed to fetch loyalty config:', error);
      return null;
    }

    // Transform database object to LoyaltyConfig type
    return {
      tiers: data.tiers || [],
      pointsPerCurrency: data.points_per_currency || 10,
      currencyPerPoint: data.currency_per_point || 0.10
    };
  }

  /**
   * Fetch notification configuration for a specific brand
   */
  private async fetchNotificationConfig(brandId: string = 'bukka'): Promise<NotificationConfig | null> {
    const { data, error } = await supabase
      .from('notification_configs')
      .select('*')
      .eq('brand_id', brandId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') { // No rows returned
        return null;
      }
      console.error('Failed to fetch notification config:', error);
      return null;
    }

    // Transform database object to NotificationConfig type
    return {
      email: data.email || { enabled: true, from: 'notifications@palaceos.com', templates: {} },
      sms: data.sms || { enabled: true, from: 'PALACEOS', templates: {} },
      push: data.push || { enabled: true, vapidKey: '' }
    };
  }

  /**
   * Fetch analytics configuration for a specific brand
   */
  private async fetchAnalyticsConfig(brandId: string = 'bukka'): Promise<AnalyticsConfig | null> {
    const { data, error } = await supabase
      .from('analytics_configs')
      .select('*')
      .eq('brand_id', brandId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') { // No rows returned
        return null;
      }
      console.error('Failed to fetch analytics config:', error);
      return null;
    }

    // Transform database object to AnalyticsConfig type
    return {
      enabled: data.enabled ?? true,
      providers: data.providers || {
        posthog: { enabled: false, apiKey: '' },
        google: { enabled: false, measurementId: '' }
      }
    };
  }

  /**
   * Get a specific configuration slice by brand ID
   */
  async getBrandConfig(brandId: string): Promise<BrandConfig | null> {
    const { data, error } = await supabase
      .from('brand_configs')
      .select('*')
      .eq('brand_id', brandId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') { // No rows returned
        return null;
      }
      console.error('Failed to fetch brand config:', error);
      return null;
    }

    return {
      id: data.brand_id,
      name: data.name,
      slug: data.slug,
      primaryColor: data.primary_color,
      secondaryColor: data.secondary_color,
      logo: data.logo || '',
      enabled: data.enabled
    };
  }

  /**
   * Update a brand configuration
   */
  async updateBrandConfig(brandId: string, updates: Partial<BrandConfig>): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase
        .from('brand_configs')
        .update({
          name: updates.name,
          slug: updates.slug,
          primary_color: updates.primaryColor,
          secondary_color: updates.secondaryColor,
          logo: updates.logo,
          enabled: updates.enabled,
          updated_at: new Date().toISOString()
        })
        .eq('brand_id', brandId);

      if (error) {
        throw error;
      }

      // Invalidate cache
      this.cache = null;
      this.cacheTimestamp = 0;

      return { success: true };
    } catch (error: any) {
      console.error('Failed to update brand config:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Update menu configuration for a brand
   */
  async updateMenuConfig(brandId: string, updates: Partial<MenuConfig>): Promise<{ success: boolean; error?: string }> {
    try {
      // Check if config exists
      const { data: existingConfig } = await supabase
        .from('menu_configs')
        .select('id')
        .eq('brand_id', brandId)
        .single();

      let result;
      if (existingConfig) {
        // Update existing config
        result = await supabase
          .from('menu_configs')
          .update({
            categories: updates.categories,
            featuredItems: updates.featuredItems,
            tax_rate: updates.taxRate,
            service_charge: updates.serviceCharge,
            bundles: updates.bundles,
            updated_at: new Date().toISOString()
          })
          .eq('brand_id', brandId);
      } else {
        // Insert new config
        result = await supabase
          .from('menu_configs')
          .insert({
            brand_id: brandId,
            categories: updates.categories || [],
            featuredItems: updates.featuredItems || [],
            tax_rate: updates.taxRate || 0.075,
            service_charge: updates.serviceCharge || 0.10,
            bundles: updates.bundles || [],
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });
      }

      if (result.error) {
        throw result.error;
      }

      // Invalidate cache
      this.cache = null;
      this.cacheTimestamp = 0;

      return { success: true };
    } catch (error: any) {
      console.error('Failed to update menu config:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Clear the configuration cache
   */
  clearCache(): void {
    this.cache = null;
    this.cacheTimestamp = 0;
  }

  // Fallback methods - return hardcoded defaults from config/defaults.ts
  private getFallbackAppConfig(): AppConfig {
    // Import fallback configs dynamically to avoid circular dependencies
    const { fallbackAppConfig } = require('@/packages/config/src/defaults');
    return fallbackAppConfig;
  }

  private getFallbackBrandConfigs(): BrandConfig[] {
    const { fallbackBrandConfig } = require('@/packages/config/src/defaults');
    return fallbackBrandConfig;
  }

  private getFallbackMenuConfig(): MenuConfig {
    const { fallbackMenuConfig } = require('@/packages/config/src/defaults');
    return fallbackMenuConfig;
  }

  private getFallbackVenueConfig(): VenueConfig {
    const { fallbackVenueConfig } = require('@/packages/config/src/defaults');
    return fallbackVenueConfig;
  }

  private getFallbackLoyaltyConfig(): LoyaltyConfig {
    const { fallbackLoyaltyConfig } = require('@/packages/config/src/defaults');
    return fallbackLoyaltyConfig;
  }

  private getFallbackNotificationConfig(): NotificationConfig {
    const { fallbackNotificationConfig } = require('@/packages/config/src/defaults');
    return fallbackNotificationConfig;
  }

  private getFallbackAnalyticsConfig(): AnalyticsConfig {
    const { fallbackAnalyticsConfig } = require('@/packages/config/src/defaults');
    return fallbackAnalyticsConfig;
  }
}

// Factory function to create CMS service instance
export function createCMSService(): CMSService {
  return new CMSService();
}