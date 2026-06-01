import '../styles/globals.css';
import '@/styles/accessibility.css';
import type { Metadata } from 'next';
import { BrandProvider } from '@/lib/contexts/BrandContext';
import { AuthProvider } from '@/lib/contexts/AuthContext';
import { getOrganizationJsonLd, getWebSiteJsonLd } from '@/lib/seo';
import JsonLd from '@/components/shared/seo/JsonLd';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Palace OS',
  description: 'Hospitality management system for Folixx Bukka and Secrets Palace',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationJsonLd = getOrganizationJsonLd();
  const webSiteJsonLd = getWebSiteJsonLd();

  return (
    <html lang="en" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
      <body>
        <BrandProvider defaultBrandId="folixx-bukka">
          <AuthProvider>
            <a href="#main-content" className="skip-link">
              Skip to main content
            </a>
            <JsonLd jsonLd={organizationJsonLd} />
            <JsonLd jsonLd={webSiteJsonLd} />
            {children}
          </AuthProvider>
        </BrandProvider>
      </body>
    </html>
  );
}

