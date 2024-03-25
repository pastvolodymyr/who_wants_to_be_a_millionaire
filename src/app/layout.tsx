import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import '@/globalStyles/globals.css';
import '@/globalStyles/variables.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Who wants to be a millionaire?',
  description: `American television game show based on the format 
  of the same-titled British program created by David Briggs`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <title>Who wants to be a millionaire?</title>
      </head>
      <body className={ inter.className }>{ children }</body>
    </html>
  );
}
