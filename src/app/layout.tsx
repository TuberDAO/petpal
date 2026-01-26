import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PetPal - AI Pet Health Monitoring | Early Access',
  description: 'Know if it\'s serious, in under a minute. PetPal uses AI to analyze photos of your pet, spotting potential issues before they become emergencies. Join the early access waitlist.',
  keywords: 'pet health, AI pet care, dog health, cat health, pet monitoring, veterinary AI, pet wellness',
  authors: [{ name: 'PetPal' }],
  openGraph: {
    title: 'PetPal - AI Pet Health Monitoring',
    description: 'Know if it\'s serious, in under a minute. AI-powered pet health insights.',
    type: 'website',
    locale: 'en_US',
    siteName: 'PetPal',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PetPal - AI Pet Health Monitoring',
    description: 'Know if it\'s serious, in under a minute. AI-powered pet health insights.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
