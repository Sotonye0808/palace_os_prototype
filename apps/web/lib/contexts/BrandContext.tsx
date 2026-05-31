'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// Define the brand context type
type BrandContextType = {
  brandId: 'folixx-bukka' | 'secrets-palace' | null;
  setBrandId: (brandId: 'folixx-bukka' | 'secrets-palace') => void;
};

// Create the context
const BrandContext = createContext<BrandContextType | null>(null);

// Custom hook to use the brand context
export const useBrand = () => {
  const context = useContext(BrandContext);
  if (!context) {
    throw new Error('useBrand must be used within a BrandProvider');
  }
  return context;
};

// Brand provider component
export const BrandProvider = ({ 
  children, 
  defaultBrandId = 'folixx-bukka' 
}: { 
  children: ReactNode; 
  defaultBrandId?: 'folixx-bukka' | 'secrets-palace' 
}) => {
  const [brandId, setBrandId] = useState<'folixx-bukka' | 'secrets-palace' | null>(
    defaultBrandId
  );

  // Update the document root element with the brand attribute when brandId changes
  useEffect(() => {
    if (brandId) {
      document.documentElement.setAttribute('data-brand', brandId);
    } else {
      document.documentElement.removeAttribute('data-brand');
    }
  }, [brandId]);

  return (
    <BrandContext.Provider value={{ brandId, setBrandId }}>
      {children}
    </BrandContext.Provider>
  );
};

export default BrandProvider;
