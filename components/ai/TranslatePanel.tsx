"use client";

import { useState } from "react";
import type { GlossaryFlag } from "@/lib/ai/glossary";
import {
  cardClass,
  Disclaimer,
  ErrorBox,
  FlagList,
  inputClass,
  primaryButtonClass,
  selectClass,
  Spinner,
} from "./shared";

const SAMPLES = [
  {
    label: "Iftar dua",
    text: "اللَّهُمَّ إِنِّي لَكَ صُمْتُ وَبِكَ آمَنْتُ وَعَلَيْكَ تَوَكَّلْتُ وَعَلَى رِزْقِكَ أَفْطَرْتُ، ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ وَثَبَتَ الْأَجْرُ إِنْ شَاءَ اللَّهُ.",
  },
  {
    label: "Virtue of fasting (Urdu)",
    text: "حضرت ابو ہریرہ رضی اللہ عنہ سے روایت ہے، رسول اللہ ﷺ نے فرمایا: جب رمضان کا آغاز ہوتا ہے، تو رحمت کے دروازے کھول دیے جاتے ہیں اور دوزخ کے دروازے بند کر دیے جاتے ہیں اور شیاطین کو زنجیریں پہنا دی جاتی ہیں۔ (صحیح مسلم)",
  },
  {
    label: "Definition of Tawheed (Urdu)",
    text: "التوحید ہے اللہ تعالیٰ کو اس کی ذات، صفات اور افعال میں یکتا ماننا، اور اس کی عبادت میں کسی کو شریک نہ ٹھہرانا۔",
  },
];

type TranslateResponse = {
  literal: string;
  contextual: string;
  notes: string;
  safetyCheck: { literalFlags: GlossaryFlag[]; contextualFlags: GlossaryFlag[]; passed: boolean };
};

export default function TranslatePanel() {
  const [text, setText] = useState("");
  const [targetLang, setTargetLang] = useState<"en" | "ar">("en");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<TranslateResponse | null>(null);

  async function translate() {
    if (!text.trim()) {
      setError("Please enter some text or pick a sample.");
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, targetLang }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unexpected error.");
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className={`${cardClass} p-5 sm:p-6`}>
        <p className="text-sm font-semibold text-slate-900 dark:text-white">
          Contextual, Shar&apos;i-term-aware translation
        </p>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Paste a dua or short Islamic text in Arabic or Urdu. You&apos;ll get a generic literal
          translation and an AyahVerse translation that keeps Islamic terms intact.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="text-xs font-medium text-slate-400 dark:text-slate-500 self-center">Try:</span>
          {SAMPLES.map((s) => (
            <button
              key={s.label}
              onClick={() => setText(s.text)}
              className="rounded-lg border border-emerald-200 dark:border-emerald-800/60 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition"
            >
              {s.label}
            </button>
          ))}
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          dir="auto"
          rows={5}
          maxLength={5000}
          placeholder="Paste a dua or Islamic text in Arabic or Urdu…"
          aria-label="Text to translate"
          className={`${inputClass} mt-4 resize-y min-h-[120px]`}
        />

        <div className="mt-3 flex flex-col sm:flex-row gap-3">
          <select
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value as "en" | "ar")}
            className={selectClass}
            aria-label="Target language"
          >
            <option value="en">Translate to: English</option>
            <option value="ar">Translate to: Arabic</option>
          </select>
          <button onClick={translate} disabled={loading} className={`${primaryButtonClass} sm:flex-1`}>
            {loading ? (
              <>
                Translating… <Spinner />
              </>
            ) : (
              "Translate"
            )}
          </button>
        </div>

        {error && <ErrorBox message={error} />}
      </div>

      {result && (
        <>
          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`${cardClass} p-5`}>
              <p className="text-xs font-semibold uppercase tracking-wide text-rose-500">
                ⚠️ Generic literal translation
              </p>
              <p dir="auto" className="mt-3 leading-relaxed text-slate-700 dark:text-slate-300">
                {result.literal}
              </p>
              <FlagList flags={result.safetyCheck.literalFlags} />
            </div>
            <div className={`${cardClass} p-5 ring-1 ring-emerald-500/30`}>
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
                ✅ AyahVerse AI — contextual translation
              </p>
              <p dir="auto" className="mt-3 leading-relaxed text-slate-800 dark:text-slate-200">
                {result.contextual}
              </p>
              <FlagList flags={result.safetyCheck.contextualFlags} showOk />
            </div>
          </div>
          {result.notes && (
            <p dir="auto" className="mt-4 text-sm italic text-slate-500 dark:text-slate-400">
              {result.notes}
            </p>
          )}
        </>
      )}

      <Disclaimer>
        AI-assisted translation. Not a fatwa or final religious reference — have a qualified
        scholar review it before publishing or formal use.
      </Disclaimer>
    </div>
  );
}
