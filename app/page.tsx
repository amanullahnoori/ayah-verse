import Link from "next/link";
import { fetchSurahList } from "@/lib/quranApi";
import HomeClient from "./HomeClient";

export default async function Home() {
  const surahs = await fetchSurahList();

  // Featured surahs: Al-Fatiha(1), Al-Baqara(2), Yasin(36), Al-Mulk(67), Ar-Rahman(55), Al-Kahf(18)
  const featuredIndices = [0, 1, 35, 66, 54, 17];
  const featuredSurahs = featuredIndices.map((i) => ({
    ...surahs[i],
    surahNo: i + 1,
  }));

  return <HomeClient surahs={surahs} featuredSurahs={featuredSurahs} />;
}
