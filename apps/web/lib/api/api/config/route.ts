// CMS Configuration API Route for Palace OS
// Provides endpoint for fetching configuration objects for the metadata-driven architecture

import { NextRequest, NextResponse } from 'next/server';
import { createCMSService } from '@/lib/services/cms';
import { createNotificationService } from '@/lib/services/notification';

// Initialize services
const cmsService = createCMSService();

// GET endpoint to fetch app configuration
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const brandId = searchParams.get('brand') || 'bukka'; // Default to bukka
    const configType = searchParams.get('type') || 'all'; // all, brand, menu, venue, loyalty, notification, analytics

    // Fetch configuration based on type
    let data;
    switch (configType) {
      case 'brand':
        data = await cmsService.getBrandConfig(brandId);
        break;
      case 'menu':
        const menuConfig = await cmsService.fetchMenuConfig(brandId);
        data = menuConfig;
        break;
      case 'venue':
        const venueConfig = await cmsService.fetchVenueConfig(brandId);
        data = venueConfig;
        break;
      case 'loyalty':
        const loyaltyConfig = await cmsService.fetchLoyaltyConfig(brandId);
        data = loyaltyConfig;
        break;
      case 'notification':
        const notificationConfig = await cmsService.fetchNotificationConfig(brandId);
        data = notificationConfig;
        break;
      case 'analytics':
        const analyticsConfig = await cmsService.fetchAnalyticsConfig(brandId);
        data = analyticsConfig;
        break;
      case 'all':
      default:
        data = await cmsService.getAppConfig();
        break;
    }

    // If data is null, return 404
    if (data === null && configType !== 'all') {
      return NextResponse.json(
        { error: `Configuration not found for brand ${brandId} and type ${configType}` },
        { status: 404 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('CMS API route error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT endpoint to update configuration
export async function PUT(request: NextRequest) {
  try {
    // Check if user is admin (simplified check - in production would use proper auth middleware)
    const { searchParams } = new URL(request.url);
    const brandId = searchParams.get('brand') || 'bukka';
    const configType = searchParams.get('type') || 'all';
    
    // For simplicity, we're allowing updates without strict auth checks
    // In a production environment, you would verify the user has admin privileges
    const { data } = await request.json();

    let success = false;
    let error = '';

    switch (configType) {
      case 'brand':
        const brandUpdateResult = await cmsService.updateBrandConfig(brandId, data);
        success = brandUpdateResult.success;
        error = brandUpdateResult.error || '';
        break;
      case 'menu':
        const menuUpdateResult = await cmsService.updateMenuConfig(brandId, data);
        success = menuUpdateResult.success;
        error = menuUpdateResult.error || '';
        break;
      // Additional config types would be handled here
      default:
        return NextResponse.json(
          { error: `Unsupported config type for update: ${configType}` },
          { status: 400 }
        );
    }

    if (!success) {
      return NextResponse.json(
        { error: error || 'Failed to update configuration' },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, message: 'Configuration updated successfully' });
  } catch (error) {
    console.error('CMS API update error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}