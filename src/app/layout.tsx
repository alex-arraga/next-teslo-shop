import type { Metadata } from "next";
import "./globals.css";

import { inter } from "@/config/fonts";
import { Providers } from "@/components";
import { ThemeProvider } from "next-themes";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"

const titleMetadata = {
  template: 'Teslo | Shop - %s',
  default: 'Teslo | Shop - Home'
}

export const metadata: Metadata = {
  metadataBase: new URL(baseURL),
  title: titleMetadata,
  description: "High-performance athletic wear inspired by Tesla's innovation. Discover sleek, sustainable, and tech-forward apparel for modern athletes.",
  openGraph: {
    title: titleMetadata,
    description: "High-performance athletic wear inspired by Tesla's innovation. Discover sleek, sustainable, and tech-forward apparel for modern athletes.",
    images: [`/imgs/logo.png`]
  }
};

export default function RootLayout({ children, }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Providers>
            {children}
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
