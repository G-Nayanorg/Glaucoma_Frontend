/**
 * Root Layout Component
 * Main layout wrapper for the entire application
 * Provides global styles, fonts, and providers
 */

import type { Metadata } from 'next';
import { Sora, Source_Code_Pro, Space_Grotesk } from 'next/font/google';
import '@/styles/globals.css';
import { ClientProviders } from './ClientProviders';

// Font configuration
const sora = Sora({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sora',
  weight: ['300', '400', '600'],
});

const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-code',
  weight: ['400', '600', '700'],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-grotesk',
  weight: ['300'],
});

// Metadata configuration
export const metadata: Metadata = {
  title: {
    default: 'AI-Powered Glaucoma Detection',
    template: '%s | Glaucoma Detection AI',
  },
  description: 'Advanced AI and Deep Learning platform for early glaucoma detection from retinal and fundus images. Get instant, accurate diagnostic reports.',
  keywords: [
    'Glaucoma Detection',
    'AI Diagnosis',
    'Deep Learning',
    'Retinal Imaging',
    'Fundus Analysis',
    'Ophthalmology',
    'Early Detection',
    'Medical AI',
  ],
  authors: [{ name: 'Glaucoma Detection AI' }],
  creator: 'Glaucoma Detection AI',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Glaucoma Detection AI',
    title: 'AI-Powered Glaucoma Detection',
    description: 'Early glaucoma detection using advanced AI and Deep Learning',
  },
};

/**
 * Root Layout Props
 */
interface RootLayoutProps {
  children: React.ReactNode;
}

/**
 * Root Layout Component
 */
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`${sora.variable} ${sourceCodePro.variable} ${spaceGrotesk.variable}`}>
      <body className="min-h-screen bg-white antialiased font-sans text-black">
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
