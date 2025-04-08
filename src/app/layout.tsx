import type { Metadata } from "next";
import "./globals.css";

import { inter } from "@/config/fonts";
import { Providers } from "@/components";
import { initColorSchemeScript } from "./theme/initColorSchemaScript";

const titleMetadata = {
  template: 'Teslo | Shop - %s',
  default: 'Teslo | Shop - Home'
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
      <head>
        {/* Applies the colour theme before the app will be rendering */}
        <script dangerouslySetInnerHTML={{ __html: initColorSchemeScript() }} />
      </head>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
