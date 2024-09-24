import type { Metadata } from "next";
import "./globals.css";

import { inter } from "@/config/fonts";
import { Providers } from "@/components";

const titleMetadata = {
  template: '%s - Teslo | Shop',
  default: 'Home - Teslo | Shop'
}

export const metadata: Metadata = {
  title: titleMetadata,
  description: "Un proyecto de eccommerce online",
  openGraph: {
    title: titleMetadata,
    description: "Un proyecto de eccommerce online",
    images: [`/imgs/logo.png`]
  }
};

export default function RootLayout({ children, }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
