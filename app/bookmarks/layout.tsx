import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bookmarks",
  description:
    "View and manage your saved Quran verses. Quickly return to bookmarked ayahs for easy reference and continued reading.",
  openGraph: {
    title: "Bookmarks | AyahVerse",
    description:
      "Your saved Quran verses — quickly return to bookmarked ayahs.",
  },
};

export default function BookmarksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
