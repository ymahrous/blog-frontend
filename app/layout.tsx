import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Inkwell — Personal Blogging Platform',
    template: '%s | Inkwell',
  },
  description:
    'A thoughtful space for personal essays, ideas, and stories. Read posts from writers around the world.',
  keywords: ['blog', 'writing', 'essays', 'personal blog', 'stories'],
  authors: [{ name: 'Inkwell' }],
  openGraph: {
    type: 'website',
    siteName: 'Inkwell',
    title: 'Inkwell — Personal Blogging Platform',
    description: 'A thoughtful space for personal essays, ideas, and stories.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Inkwell — Personal Blogging Platform',
    description: 'A thoughtful space for personal essays, ideas, and stories.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
          <footer
            style={{
              borderTop: '1px solid var(--ink-border)',
              padding: '2.5rem 1.5rem',
              textAlign: 'center',
              color: 'var(--muted)',
              fontSize: '0.875rem',
              marginTop: '5rem',
            }}
          >
            <span style={{ fontFamily: 'Playfair Display, serif', color: 'var(--amber)', fontWeight: 600 }}>
              Inkwell
            </span>{' '}
            · Built with purpose · {new Date().getFullYear()}
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
