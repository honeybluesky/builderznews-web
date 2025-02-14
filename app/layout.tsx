import './globals.css'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'

export const metadata: Metadata = {
  title: 'BuilderzNews - Completely Free AI-Powered Startup Intel 🚀',
  description: 'Daily startup funding and tech trends monitored by AI - Completely Free. Get precise data and relevant insights without the fluff.',
  keywords: 'startup news, AI monitoring, tech trends, startup funding, tech news, free news',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={GeistSans.className}>{children}</body>
    </html>
  );
}