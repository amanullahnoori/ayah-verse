"use client";

import { useEffect, useState } from "react";
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

type Category = { key: string; label: string; count: number };

type AskResponse = {
  answer: string;
  cited: string[];
  foundInContent: boolean;
  safetyCheck: { flags: GlossaryFlag[] };
};

const ENGLISH_LABELS: Record<string, string> = {
  asma_ul_husna: "99 Names of Allah",
  umrah_steps: "Umrah steps",
  morning_evening_adhkar: "Morning & evening adhkar",
  after_prayer_duas: "After-prayer duas",
};

export default function AskPanel() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesError, setCategoriesError] = useState(false);
  const [category, setCategory] = useState<string | null>(null);
  const [question, setQuestion] = useState("");
  const [targetLang, setTargetLang] = useState<"en" | "ar">("en");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AskResponse | null>(null);

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data: { categories: Category[] }) => {
        setCategories(data.categories);
        setCategory(data.categories[0]?.key ?? null);
      })
      .catch(() => setCategoriesError(true));
  }, []);

  async function ask() {
    if (!category) {
      setError("Please choose a category first.");
      return;
    }
    if (!question.trim()) {
      setError("Please type a question.");
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, question, targetLang }),
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
        <p className="text-sm font-semibold text-slate-900 dark:text-white">Verified Q&amp;A</p>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Answers come only from AyahVerse&apos;s verified content, with citations. If the answer
          isn&apos;t there, the assistant says so instead of guessing.
        </p>

        <p className="mt-5 text-xs font-medium text-slate-400 dark:text-slate-500">Choose a category</p>
        <div className="mt-2 flex flex-wrap gap-2" role="radiogroup" aria-label="Category">
          {categoriesError && (
            <span className="text-sm text-rose-600 dark:text-rose-400">
              Couldn&apos;t load categories. Please refresh the page.
            </span>
          )}
          {categories.map((c) => {
            const active = c.key === category;
            return (
              <button
                key={c.key}
                role="radio"
                aria-checked={active}
                onClick={() => setCategory(c.key)}
                className={`rounded-xl border px-3 py-2 text-start transition ${
                  active
                    ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20"
                    : "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                <span
                  className={`block text-sm font-medium ${
                    active ? "text-emerald-700 dark:text-emerald-400" : "text-slate-700 dark:text-slate-300"
                  }`}
                >
                  {ENGLISH_LABELS[c.key] ?? c.label}{" "}
                  <span className="text-xs opacity-60">({c.count})</span>
                </span>
                <span dir="rtl" className="block text-xs text-slate-400 dark:text-slate-500">
                  {c.label}
                </span>
              </button>
            );
          })}
        </div>

        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
              e.preventDefault();
              ask();
            }
          }}
          dir="auto"
          rows={3}
          maxLength={2000}
          placeholder="e.g. What does Ar-Raheem mean? How many rounds of Tawaf are there?"
          aria-label="Your question"
          className={`${inputClass} mt-4 resize-y`}
        />

        <div className="mt-3 flex flex-col sm:flex-row gap-3">
          <select
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value as "en" | "ar")}
            className={selectClass}
            aria-label="Answer language"
          >
            <option value="en">Answer in: English</option>
            <option value="ar">Answer in: Arabic</option>
          </select>
          <button onClick={ask} disabled={loading} className={`${primaryButtonClass} sm:flex-1`}>
            {loading ? (
              <>
                Searching… <Spinner />
              </>
            ) : (
              "Ask"
            )}
          </button>
        </div>

        {error && <ErrorBox message={error} />}
      </div>

      {result && (
        <div className={`${cardClass} mt-5 p-5 sm:p-6`}>
          <span
            className={`inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-medium ${
              result.foundInContent
                ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400"
                : "bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400"
            }`}
          >
            {result.foundInContent ? "✓ Answered from verified content" : "Not found in verified content"}
          </span>
          <p dir="auto" className="mt-3 leading-relaxed text-slate-800 dark:text-slate-200 whitespace-pre-line">
            {result.answer}
          </p>
          {result.cited.length > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-400 dark:text-slate-500">📚 Sources:</span>
              {result.cited.map((c) => (
                <span
                  key={c}
                  dir="auto"
                  className="rounded-lg bg-blue-50 dark:bg-blue-900/20 px-2.5 py-1 text-xs font-medium text-blue-700 dark:text-blue-400"
                >
                  {c}
                </span>
              ))}
            </div>
          )}
          <FlagList flags={result.safetyCheck?.flags ?? []} />
        </div>
      )}

      <Disclaimer>
        The assistant answers only from verified content already in the app and refuses rather than
        guessing. Check any religious content with a qualified scholar before relying on it formally.
      </Disclaimer>
    </div>
  );
}
