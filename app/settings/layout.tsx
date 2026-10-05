import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings",
  description:
    "Customize your Quran reading experience — appearance, Arabic script, translation language, transliteration, reciter, zoom, and reading mode.",
  openGraph: {
    title: "Settings | AyahVerse",
    description:
      "Customize your AyahVerse Quran reading experience with theme, font, translation, and reciter preferences.",
  },
};

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
