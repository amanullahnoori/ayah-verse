import type { Metadata } from "next";
import { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import AudioPlayer from "@/components/AudioPlayer";
import KeyboardShortcuts from "@/components/KeyboardShortcuts";
import MainContent from "@/components/MainContent";
import { BookmarkProvider } from "@/context/BookmarkContext";
import { SettingsProvider } from "@/context/SettingsContext";
import { AudioProvider } from "@/context/AudioContext";
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";
import FirebaseAnalytics from "@/components/FirebaseAnalytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "AyahVerse — Read, Listen & Bookmark the Holy Quran",
    template: "%s | AyahVerse",
  },
  description:
    "A beautiful, modern Quran web app. Read the Quran verse by verse with Arabic text, multiple translations, transliteration, and audio recitation by renowned reciters.",
  keywords: [
    "Quran",
    "Islam",
    "Arabic",
    "Recitation",
    "Holy Quran",
    "Quran translation",
    "Quran audio",
    "Quran transliteration",
    "Islamic app",
    "Read Quran online",
  ],
  authors: [{ name: "AyahVerse" }],
  creator: "AyahVerse",
  metadataBase: new URL("https://ayahverse.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "AyahVerse",
    title: "AyahVerse — Read, Listen & Bookmark the Holy Quran",
    description:
      "Read the Quran verse by verse with Arabic text, translations in multiple languages, transliteration, and audio recitation.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AyahVerse — Read, Listen & Bookmark the Holy Quran",
    description:
      "Read the Quran with Arabic text, translations, transliteration, and audio recitation.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="overflow-x-hidden bg-slate-50 dark:bg-slate-950"
    >
      <head>
        {/* Prevent dark-mode flash — runs synchronously before first paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=JSON.parse(localStorage.getItem("quran-app-settings")||"{}");var t=s.theme||"dark";if(t==="dark"||(t==="system"&&matchMedia("(prefers-color-scheme:dark)").matches))document.documentElement.classList.add("dark")}catch(e){}})()`,
          }}
        />
        {/* PWA meta tags */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="AyahVerse" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#059669" />
        {/* Amiri + Amiri Quran fonts for Arabic text */}
        <link
          href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Amiri+Quran&display=swap"
          rel="stylesheet"
        />
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "AyahVerse",
              url: "https://ayahverse.vercel.app",
              description:
                "A beautiful, modern Quran web app. Read the Quran verse by verse with Arabic text, multiple translations, transliteration, and audio recitation.",
              applicationCategory: "ReligiousApp",
              operatingSystem: "Any",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              inLanguage: ["en", "ar", "ur", "bn", "hi"],
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden bg-slate-50 dark:bg-slate-950`}
        suppressHydrationWarning
      >
        <SettingsProvider>
          <BookmarkProvider>
            <AudioProvider>
              {/* Skip to content — accessibility */}
              <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:px-4 focus:py-2 focus:bg-emerald-600 focus:text-white focus:rounded-xl focus:text-sm focus:font-semibold focus:shadow-lg"
              >
                Skip to main content
              </a>
              <Navbar />
              <MainContent>{children}</MainContent>
              <AudioPlayer />
              <KeyboardShortcuts />
              <ServiceWorkerRegistration />
              <Suspense fallback={null}>
                <FirebaseAnalytics />
              </Suspense>
            </AudioProvider>
          </BookmarkProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}
