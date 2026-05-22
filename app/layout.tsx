import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { FloatingLinks } from "@/components/floating-links";
import { Toaster } from "sonner";
import StructuredData from "@/components/structured-data";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const BASE_URL = "https://condenser.codemintah.dev";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "Mintah De Condenser — Free Browser Video Compressor",
    template: "%s | Mintah De Condenser",
  },

  description:
    "Compress videos up to 90% smaller, for free, entirely in your browser. No uploads, no sign-up. Supports MP4, MOV, MKV, AVI, WebM, M4V and more. Optimized for Twitter and WhatsApp Status.",

  keywords: [
    "video compressor",
    "compress video online",
    "free video compression",
    "browser video compressor",
    "reduce video file size",
    "video converter",
    "no upload video compressor",
    "offline video compressor",
    "MP4 compressor",
    "MOV compressor",
    "video for Twitter",
    "video for WhatsApp",
    "ffmpeg browser",
    "WebAssembly video",
    "mintah de condenser",
    "codemintah",
  ],

  authors: [{ name: "Andrews Mintah", url: "https://codemintah.dev" }],
  creator: "Andrews Mintah",
  publisher: "CodeMintah",

  // Canonical
  alternates: {
    canonical: BASE_URL,
  },

  // Open Graph
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Mintah De Condenser",
    title: "Mintah De Condenser — Free Browser Video Compressor",
    description:
      "Compress videos up to 90% smaller, entirely in your browser. No uploads. Supports MP4, MOV, MKV, AVI, WebM and more.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Mintah De Condenser — Free Browser Video Compressor",
      },
    ],
  },

  // Twitter / X Card
  twitter: {
    card: "summary_large_image",
    site: "@codemintah",
    creator: "@codemintah",
    title: "Mintah De Condenser — Free Browser Video Compressor",
    description:
      "Compress videos up to 90% smaller, entirely in your browser. No uploads. Supports MP4, MOV, MKV, AVI, WebM and more.",
    images: ["/opengraph-image"],
  },

  // Search engine verification
  // → Replace these placeholder values after registering on each platform
  verification: {
    google: "REPLACE_WITH_GOOGLE_VERIFICATION_CODE",
    // yandex: "REPLACE_WITH_YANDEX_VERIFICATION_CODE",
    // bing: Add <meta name="msvalidate.01"> via the other object below
    other: {
      "msvalidate.01": "REPLACE_WITH_BING_VERIFICATION_CODE",
    },
  },

  // App / PWA
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icon-192.png" }],
  },

  // Crawling
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <StructuredData />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="relative">
          <Navbar />
          {children}
          <FloatingLinks />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
