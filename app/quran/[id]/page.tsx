import { fetchSurah } from "@/lib/quranApi";
import { getIndopakSurah } from "@/lib/localQuran";
import SurahDetailClient from "./SurahDetailClient";
import { notFound } from "next/navigation";

interface SurahPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: SurahPageProps) {
  const { id } = await params;
  const surahNo = parseInt(id, 10);
  if (isNaN(surahNo) || surahNo < 1 || surahNo > 114)
    return { title: "Not Found" };

  try {
    const surah = await fetchSurah(surahNo);
    const title = `Surah ${surah.surahName} (${surah.surahNameArabic}) — ${surah.surahNameTranslation}`;
    const description = `Read Surah ${surah.surahName} (${surah.surahNameArabic}) — ${surah.surahNameTranslation}. ${surah.totalAyah} verses, revealed in ${surah.revelationPlace}. Arabic text with translation, transliteration, and audio recitation.`;
    return {
      title,
      description,
      openGraph: {
        title: `${title} | AyahVerse`,
        description,
      },
    };
  } catch {
    return {
      title: `Surah ${surahNo} — AyahVerse`,
      description: "Read and listen to the Holy Quran with AyahVerse.",
    };
  }
}

export default async function SurahPage({ params }: SurahPageProps) {
  const { id } = await params;
  const surahNo = parseInt(id, 10);

  if (isNaN(surahNo) || surahNo < 1 || surahNo > 114) {
    notFound();
  }

  const surah = await fetchSurah(surahNo);
  const indopakAyahs = getIndopakSurah(surahNo);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://ayahverse.vercel.app",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Quran",
        item: "https://ayahverse.vercel.app/quran",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `Surah ${surah.surahName}`,
        item: `https://ayahverse.vercel.app/quran/${surahNo}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <SurahDetailClient surah={surah} indopakAyahs={indopakAyahs} />
    </>
  );
}
