import { useState, useEffect } from 'react';
import { Button } from '@/components/shared/Button';
import { Input } from '@/components/shared/Input';
import { Textarea } from '@/components/shared/Textarea';
import { Select } from '@/components/shared/Select';
import { createCMSService } from '@/lib/services/cms';

type ConfigSection = 'brand' | 'menu' | 'venue' | 'loyalty' | 'notification' | 'analytics';

interface ConfigEditorProps {
  brandId: string;
  section: ConfigSection;
}

export default function ConfigEditor({ brandId, section }: ConfigEditorProps) {
  const [config, setConfig] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  
  const cmsService = createCMSService();

  // Fetch configuration on mount and when brandId or section changes
  useEffect(() => {
    const fetchConfig = async () => {
      setLoading(true);
      setError(null);
      
      try {
        let data;
        switch (section) {
          case 'brand':
            data = await cmsService.getBrandConfig(brandId);
            break;
          case 'menu':
            data = await cmsService.fetchMenuConfig(brandId);
            break;
          case 'venue':
            data = await cmsService.fetchVenueConfig(brandId);
            break;
          case 'loyalty':
            data = await cmsService.fetchLoyaltyConfig(brandId);
            break;
          case 'notification':
            data = await cmsService.fetchNotificationConfig(brandId);
            break;
          case 'analytics':
            data = await cmsService.fetchAnalyticsConfig(brandId);
            break;
          default:
            data = null;
        }
        
        setConfig(data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch config:', err);
        setError('Failed to load configuration');
        setLoading(false);
      }
    };
    
    fetchConfig();
  }, [brandId, section, cmsService]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(false);
    
    try {
      let success = false;
      let errorMsg = '';
      
      switch (section) {
        case 'brand':
          const brandResult = await cmsService.updateBrandConfig(brandId, config);
          success = brandResult.success;
          errorMsg = brandResult.error || '';
          break;
        case 'menu':
          const menuResult = await cmsService.updateMenuConfig(brandId, config);
          success = menuResult.success;
          errorMsg = menuResult.error || '';
          break;
        // Additional sections would be handled here
        default:
          setError('Update not implemented for this section');
          return;
      }
      
      if (success) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000); // Hide success message after 3 seconds
      } else {
        setError(errorMsg || 'Failed to update configuration');
      }
    } catch (err) {
      console.error('Failed to update config:', err);
      setError('Failed to update configuration');
    }
  };

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setConfig(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle JSON changes (for complex fields)
  const handleJSONChange = (fieldName: string, jsonString: string) => {
    try {
      const parsed = JSON.parse(jsonString);
      setConfig(prev => ({
        ...prev,
        [fieldName]: parsed
      }));
      setError(null); // Clear error if JSON is valid
    } catch (err) {
      setError(`Invalid JSON for ${fieldName}`);
    }
  };

  if (loading) {
    return <div className="p-6">Loading configuration...</div>;
  }

  if (error) {
    return <div className="p-6 bg-red-50 border-l-4 border-red-500 p-4 mb-6">{error}</div>;
  }

  if (!config) {
    return <div className="p-6">No configuration data available</div>;
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-text-brand">
          Edit {section} Configuration for {brandId.toUpperCase()}
        </h2>
        {saved && (
          <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
            Configuration saved successfully!
          </div>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Render form based on section type */}
        {section === 'brand' && (
          <>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-text mb-1">
                Name
              </label>
              <Input
                id="name"
                name="name"
                value={config.name || ''}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label htmlFor="slug" className="block text-sm font-medium text-text mb-1">
                Slug
              </label>
              <Input
                id="slug"
                name="slug"
                value={config.slug || ''}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label htmlFor="primaryColor" className="block text-sm font-medium text-text mb-1">
                Primary Color
              </label>
              <Input
                id="primaryColor"
                name="primaryColor"
                type="color"
                value={config.primaryColor || '#8B4513'}
                onChange={handleChange}
                className="w-12 h-12 p-0"
              />
            </div>
            
            <div>
              <label htmlFor="secondaryColor" className="block text-sm font-medium text-text mb-1">
                Secondary Color
              </label>
              <Input
                id="secondaryColor"
                name="secondaryColor"
                type="color"
                value={config.secondaryColor || '#DEB887'}
                onChange={handleChange}
                className="w-12 h-12 p-0"
              />
            </div>
            
            <div>
              <label htmlFor="logo" className="block text-sm font-medium text-text mb-1">
                Logo URL
              </label>
              <Input
                id="logo"
                name="logo"
                value={config.logo || ''}
                onChange={handleChange}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                id="enabled"
                name="enabled"
                type="checkbox"
                checked={config.enabled ?? true}
                onChange={handleChange}
                className="h-4 w-4"
              />
              <label htmlFor="enabled" className="text-text">
                Enabled
              </label>
            </div>
          </>
        )}
        
        {section === 'menu' && (
          <>
            <div>
              <label htmlFor="categories" className="block text-sm font-medium text-text mb-1">
                Categories (JSON)
              </label>
              <Textarea
                id="categories"
                name="categories"
                value={JSON.stringify(config.categories, null, 2)}
                onChange={(e) => handleJSONChange('categories', e.target.value)}
                rows={4}
                placeholder="[{ \"id\": \"appetizers\", \"name\": \"Appetizers\", \"description\": \"...\", \"image\": \"...\", \"sortOrder\": 1 }]"
              />
              {error && error.includes('categories') && (
                <p className="text-xs text-red-500 mt-1">Invalid JSON format</p>
              )}
            </div>
            
            <div>
              <label htmlFor="featuredItems" className="block text-sm font-medium text-text mb-1">
                Featured Items (JSON Array of Strings)
              </label>
              <Textarea
                id="featuredItems"
                name="featuredItems"
                value={JSON.stringify(config.featuredItems, null, 2)}
                onChange={(e) => handleJSONChange('featuredItems', e.target.value)}
                rows={2}
                placeholder="[\"jollof-rice\", \"egusi-soup\"]"
              />
              {error && error.includes('featuredItems') && (
                <p className="text-xs text-red-500 mt-1">Invalid JSON format</p>
              )}
            </div>
            
            <div>
              <label htmlFor="taxRate" className="block text-sm font-medium text-text mb-1">
                Tax Rate (as decimal)
              </label>
              <Input
                id="taxRate"
                name="taxRate"
                type="number"
                step="0.0001"
                value={config.taxRate?.toString() || '0.075'}
                onChange={handleChange}
              />
            </div>
            
            <div>
              <label htmlFor="serviceCharge" className="block text-sm font-medium text-text mb-1">
                Service Charge (as decimal)
              </label>
              <Input
                id="serviceCharge"
                name="serviceCharge"
                type="number"
                step="0.0001"
                value={config.serviceCharge?.toString() || '0.10'}
                onChange={handleChange}
              />
            </div>
            
            <div>
              <label htmlFor="bundles" className="block text-sm font-medium text-text mb-1">
                Bundles (JSON)
              </label>
              <Textarea
                id="bundles"
                name="bundles"
                value={JSON.stringify(config.bundles, null, 2)}
                onChange={(e) => handleJSONChange('bundles', e.target.value)}
                rows={4}
                placeholder="[{\"id\": \"family-feast\", \"name\": \"Family Feast Bundle\", \"description\": \"...\", \"price\": 5500, \"items\": [{\"menuItemId\": \"jollof-rice\", \"quantity\": 2}]}]"
              />
              {error && error.includes('bundles') && (
                <p className="text-xs text-red-500 mt-1">Invalid JSON format</p>
              )}
            </div>
          </>
        )}
        
        {/* Additional sections would be rendered here */}
        
        <div className="flex justify-end">
          <Button 
            type="submit" 
            variant="primary"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Configuration'}
          </Button>
        </div>
      </form>
    </div>
  );
}