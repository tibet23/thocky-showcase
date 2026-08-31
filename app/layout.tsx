import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://apps.microsoft.com'),
  title: 'Thocky — Zero-Latency Mechanical Keyboard Acoustic Simulator & Live Typing Companion',
  description:
    'Thocky by Maximus Labs brings the tactile, rich acoustic experience of $399+ custom mechanical keyboards to any PC or laptop with real-time procedural Web Audio DSP synthesis, 6 flagship switch profiles, and zero latency.',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'Thocky — Zero-Latency Mechanical Keyboard Acoustic Simulator & Live Typing Companion',
    description:
      'Transform your typing into deep creamy thocks, marbly pops, and buckling spring clacks in real-time. 1-day free trial, only $3.99/year on Windows & Microsoft Store.',
    type: 'website',
    images: ['/logo.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Thocky — Zero-Latency Mechanical Keyboard Simulator',
    description: 'Real-time procedural mechanical keyboard acoustic simulator for Windows by Maximus Labs.',
    images: ['/logo.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-[#0D0B12] text-[#F0ECF8] antialiased selection:bg-[#7C3AED]/40 selection:text-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}


