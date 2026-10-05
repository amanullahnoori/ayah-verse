import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Offline",
  description:
    "You are currently offline. AyahVerse requires an internet connection to load Quran text, translations, and audio.",
  robots: { index: false, follow: false },
};

export default function OfflineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
