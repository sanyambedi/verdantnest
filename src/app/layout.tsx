
import type { Metadata } from 'next';
import './globals.css';
import { FirebaseClientProvider } from '@/firebase';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://verdantnest.com'),
  title: {
    default: 'VerdantNest | Premium Botanical Collection',
    template: '%s | VerdantNest'
  },
  description: 'Expertly curated indoor plants, rare species, and botanical tools. Elevate your living sanctuary with VerdantNest conditioning.',
  keywords: ['indoor plants', 'rare botanicals', 'houseplant care', 'fiddle leaf fig', 'monstera deliciosa', 'botanical sanctuary'],
  authors: [{ name: 'VerdantNest Botanical Team' }],
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://verdantnest.com',
    siteName: 'VerdantNest',
    images: [
      {
        url: 'https://picsum.photos/seed/monstera-white-pot/1200/630',
        width: 1200,
        height: 630,
        alt: 'VerdantNest Botanical Collection'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VerdantNest | Premium Botanical Collection',
    description: 'Expertly curated indoor plants and rare species.',
    images: ['https://picsum.photos/seed/monstera-white-pot/1200/630']
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&display=swap" rel="stylesheet" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function cleanExt() {
                  if (document.body) {
                    Array.from(document.body.attributes).forEach(function(attr) {
                      if (attr.name.indexOf('data-atm') === 0 || attr.name.indexOf('data-gr') === 0 || attr.name.indexOf('cz-shortcut') === 0) {
                        document.body.removeAttribute(attr.name);
                      }
                    });
                  }
                }
                cleanExt();
                document.addEventListener('DOMContentLoaded', cleanExt);
              })();
            `,
          }}
        />
      </head>
      <body className="font-body antialiased selection:bg-primary/20" suppressHydrationWarning>
        <FirebaseClientProvider>
          {children}
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
