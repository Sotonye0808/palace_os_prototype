import '../styles/globals.css';
import '@/styles/accessibility.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { BrandProvider } from '@/lib/contexts/BrandContext';
import { AuthProvider } from '@/lib/contexts/AuthContext';
import { getOrganizationJsonLd, getWebSiteJsonLd } from '@/lib/seo';
import JsonLd from '@/components/shared/seo/JsonLd';

const inter = Inter({ subsets: ['latin'] });

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
    <html lang="en" className={inter.className}>
      <body>
        <AuthProvider>
          <BrandProvider defaultBrandId="folixx-bukka">
            <a href="#main-content" className="skip-link">
              Skip to main content
            </a>
            <JsonLd jsonLd={organizationJsonLd} />
            <JsonLd jsonLd={webSiteJsonLd} />
            {children}
          </BrandProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

