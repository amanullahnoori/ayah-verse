import { memo } from "react";
import Link from "next/link";
import { type SurahInfo } from "@/lib/quranApi";

interface SurahCardProps {
  surah: SurahInfo;
  index: number;
}

export default memo(function SurahCard({ surah, index }: SurahCardProps) {
  const surahNo = index + 1;

  return (
    <Link
      href={`/quran/${surahNo}`}
      data-analytics="surah_card_click"
      data-analytics-surah-id={String(surahNo)}
      data-analytics-surah-name={surah.surahName}
      data-analytics-location="quran_list"
      className="group block p-4 md:p-5 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 hover:border-emerald-200 dark:hover:border-emerald-800/50 hover:shadow-lg hover:shadow-emerald-50 dark:hover:shadow-none transition-all duration-300 hover:-translate-y-0.5"
    >
      <div className="flex items-center gap-4">
        {/* Surah number */}
        <div className="relative flex-shrink-0">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/30 flex items-center justify-center group-hover:from-emerald-100 group-hover:to-teal-100 dark:group-hover:from-emerald-900/50 dark:group-hover:to-teal-900/50 transition-all duration-300">
            <span className="text-sm font-bold text-emerald-700 dark:text-emerald-400">
              {surahNo}
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors truncate">
            {surah.surahName}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {surah.surahNameTranslation} • {surah.totalAyah} verses
          </p>
          <div className="flex items-center gap-2 mt-1">
            <span
              className={`inline-block w-1.5 h-1.5 rounded-full ${
                surah.revelationPlace === "Mecca"
                  ? "bg-amber-400"
                  : "bg-emerald-400"
              }`}
            />
            <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider font-medium">
              {surah.revelationPlace}
            </span>
          </div>
        </div>

        {/* Arabic name */}
        <div className="text-right flex-shrink-0">
          <p className="text-xl arabic-text text-slate-700 dark:text-slate-300 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
            {surah.surahNameArabic}
          </p>
        </div>
      </div>
    </Link>
  );
});
