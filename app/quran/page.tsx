import { fetchSurahList } from "@/lib/quranApi";
import QuranListClient from "./QuranListClient";

export const metadata = {
  title: "Browse All 114 Surahs of the Holy Quran",
  description:
    "Browse and read all 114 surahs of the Holy Quran with Arabic text, English translation, transliteration, and audio recitation.",
  openGraph: {
    title: "Browse All 114 Surahs — AyahVerse",
    description:
      "Browse and read all 114 surahs of the Holy Quran with translations and audio.",
  },
};

export default async function QuranPage() {
  const surahs = await fetchSurahList();
  return <QuranListClient surahs={surahs} />;
}
