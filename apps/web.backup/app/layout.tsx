import './globals.css';
import '@/styles/accessibility.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { BrandProvider } from '@/src/contexts/BrandContext';
import { AuthProvider } from '@/src/contexts/AuthContext';
import { getOrganizationJsonLd, getWebSiteJsonLd } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';
import NextI18Next from 'next-i18next';

const inter = Inter({ subsets: ['latin'] });
const nextI18NextInstance = new NextI18Next({ defaultLocale: 'en', locales: ['en'] });

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
    <AuthProvider>
      <BrandProvider defaultBrandId="folixx-bukka">
        <nextI18NextInstance.I18nProvider>
          <html lang="en" className={inter.className}>
            <body>
              <a href="#main-content" className="skip-link">
                Skip to main content
              </a>
              <JsonLd jsonLd={organizationJsonLd} />
              <JsonLd jsonLd={webSiteJsonLd} />
              {children}
            </body>
          </html>
        </nextI18NextInstance.I18nProvider>
      </BrandProvider>
    </AuthProvider>
  );
}
