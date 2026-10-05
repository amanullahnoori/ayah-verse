"use client";

import { useState } from "react";
import ChatPanel from "@/components/ai/ChatPanel";
import TranslatePanel from "@/components/ai/TranslatePanel";
import AskPanel from "@/components/ai/AskPanel";

const TABS = [
  { id: "chat", label: "Chat", icon: "💬" },
  { id: "translate", label: "Translate", icon: "🌐" },
  { id: "ask", label: "Verified Q&A", icon: "📚" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function AIClient() {
  const [tab, setTab] = useState<TabId>("chat");

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 md:pt-24 pb-8">
      <div className="max-w-5xl mx-auto px-4">
        <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-5">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              AyahVerse <span className="text-emerald-600 dark:text-emerald-400">AI</span>
            </h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Your Islamic knowledge assistant
            </p>
          </div>

          <div
            role="tablist"
            aria-label="AI tools"
            className="inline-flex self-start sm:self-auto rounded-xl bg-slate-100 dark:bg-slate-800/80 p-1"
          >
            {TABS.map((t) => {
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  role="tab"
                  id={`tab-${t.id}`}
                  aria-selected={active}
                  aria-controls={`panel-${t.id}`}
                  onClick={() => setTab(t.id)}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3 sm:px-4 py-2 text-sm font-medium transition ${
                    active
                      ? "bg-white dark:bg-slate-700 text-emerald-700 dark:text-emerald-400 shadow-sm"
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                  }`}
                >
                  <span aria-hidden="true">{t.icon}</span>
                  {t.label}
                </button>
              );
            })}
          </div>
        </header>

        {/* Panels stay mounted so switching tabs keeps their state */}
        {TABS.map((t) => (
          <section
            key={t.id}
            role="tabpanel"
            id={`panel-${t.id}`}
            aria-labelledby={`tab-${t.id}`}
            hidden={tab !== t.id}
          >
            {t.id === "chat" && <ChatPanel />}
            {t.id === "translate" && <TranslatePanel />}
            {t.id === "ask" && <AskPanel />}
          </section>
        ))}
      </div>
    </div>
  );
}
