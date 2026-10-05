"use client";

import { useEffect, useRef, useState } from "react";
import Markdown from "./Markdown";
import { cardClass } from "./shared";

type Message = { role: "user" | "assistant"; content: string };

const STORAGE_KEY = "ayahverse-ai-chat";

const SUGGESTIONS = [
  "What is the meaning and virtue of Ayat al-Kursi?",
  "Which adhkar should I recite after every prayer?",
  "Explain the steps of Umrah in simple words",
  "What does the name Ar-Rahman mean?",
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:text-slate-200 dark:hover:bg-slate-700/60 transition"
      aria-label="Copy answer"
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

function AssistantAvatar() {
  return (
    <div className="w-8 h-8 shrink-0 rounded-xl bg-linear-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-sm shadow-sm">
      ✦
    </div>
  );
}

export default function ChatPanel() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setMessages(JSON.parse(saved));
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    if (!streaming) localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages, streaming]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 160;
    if (nearBottom || !streaming) el.scrollTop = el.scrollHeight;
  }, [messages, streaming]);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  }, [input]);

  useEffect(() => () => abortRef.current?.abort(), []);

  async function send(text: string) {
    const content = text.trim();
    if (!content || streaming) return;

    const previous = messages;
    const history: Message[] = [...messages, { role: "user", content }];
    setMessages([...history, { role: "assistant", content: "" }]);
    setInput("");
    setError(null);
    setStreaming(true);

    const controller = new AbortController();
    abortRef.current = controller;
    let reply = "";

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
        signal: controller.signal,
      });
      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        reply += decoder.decode(value, { stream: true });
        setMessages([...history, { role: "assistant", content: reply }]);
      }
      if (!reply.trim()) {
        throw new Error("The assistant returned an empty response. Please try again.");
      }
    } catch (err) {
      if (controller.signal.aborted && reply.trim()) {
        setMessages([...history, { role: "assistant", content: reply }]);
      } else {
        setMessages(previous);
        setInput(content);
        if (!controller.signal.aborted) {
          setError(err instanceof Error ? err.message : "Something went wrong.");
        }
      }
    } finally {
      abortRef.current = null;
      setStreaming(false);
    }
  }

  function clearChat() {
    abortRef.current?.abort();
    setMessages([]);
    setError(null);
    localStorage.removeItem(STORAGE_KEY);
  }

  const isEmpty = messages.length === 0;

  return (
    <div className={`${cardClass} flex flex-col h-[calc(100dvh-17rem)] md:h-[calc(100dvh-15rem)] min-h-[440px] overflow-hidden`}>
      {/* Panel header */}
      <div className="flex items-center justify-between gap-3 px-4 sm:px-5 py-3 border-b border-slate-100 dark:border-slate-700/50">
        <div className="flex items-center gap-3 min-w-0">
          <AssistantAvatar />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-900 dark:text-white">AyahVerse Assistant</p>
            <p className="text-xs text-slate-400 dark:text-slate-500 truncate">
              Quran, duas, adhkar, Umrah &amp; more
            </p>
          </div>
        </div>
        {!isEmpty && (
          <button
            onClick={clearChat}
            className="shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/60 transition"
          >
            New chat
          </button>
        )}
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 sm:px-5 py-5" aria-live="polite">
        {isEmpty ? (
          <div className="min-h-full flex flex-col items-center justify-center text-center px-2 py-2">
            <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-2xl text-white shadow-lg shadow-emerald-500/30 mb-4">
              ✦
            </div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              Assalamu Alaikum! How can I help?
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 max-w-md">
              Ask about the Quran, duas, the 99 Names of Allah or Umrah — in any language.
            </p>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-2xl">
              {SUGGESTIONS.map((s, i) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className={`${i >= 2 ? "hidden sm:block" : ""} rounded-xl border border-slate-200 dark:border-slate-700 px-4 py-3 text-start text-sm text-slate-600 dark:text-slate-300 hover:border-emerald-300 dark:hover:border-emerald-700 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/10 transition`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-5 max-w-3xl mx-auto">
            {messages.map((m, i) =>
              m.role === "user" ? (
                <div key={i} className="flex justify-end">
                  <div
                    dir="auto"
                    className="max-w-[85%] rounded-2xl rounded-ee-md bg-emerald-600 px-4 py-2.5 text-[15px] text-white whitespace-pre-wrap wrap-break-word"
                  >
                    {m.content}
                  </div>
                </div>
              ) : (
                <div key={i} className="flex gap-3">
                  <AssistantAvatar />
                  <div className="min-w-0 flex-1">
                    <div className="rounded-2xl rounded-ss-md bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700/50 px-4 py-3 text-[15px] text-slate-800 dark:text-slate-200 wrap-break-word">
                      {m.content ? (
                        <Markdown text={m.content} />
                      ) : (
                        <span className="inline-flex gap-1 py-1" aria-label="Assistant is typing">
                          {[0, 150, 300].map((d) => (
                            <span
                              key={d}
                              className="w-2 h-2 rounded-full bg-slate-400 animate-bounce"
                              style={{ animationDelay: `${d}ms` }}
                            />
                          ))}
                        </span>
                      )}
                    </div>
                    {m.content && !(streaming && i === messages.length - 1) && (
                      <div className="mt-1">
                        <CopyButton text={m.content} />
                      </div>
                    )}
                  </div>
                </div>
              ),
            )}
          </div>
        )}
      </div>

      {/* Composer */}
      <div className="border-t border-slate-100 dark:border-slate-700/50 px-3 sm:px-4 py-3">
        {error && (
          <p role="alert" className="mb-2 text-xs text-rose-600 dark:text-rose-400">
            {error}
          </p>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex items-end gap-2 max-w-3xl mx-auto"
        >
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
                e.preventDefault();
                send(input);
              }
            }}
            rows={1}
            dir="auto"
            maxLength={4000}
            placeholder="Ask about the Quran, duas, Umrah…"
            aria-label="Message"
            className="flex-1 resize-none rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 px-4 py-3 text-[15px] text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/60 focus:border-transparent"
          />
          {streaming ? (
            <button
              type="button"
              onClick={() => abortRef.current?.abort()}
              className="h-12 w-12 shrink-0 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center hover:bg-slate-300 dark:hover:bg-slate-600 transition"
              aria-label="Stop generating"
            >
              <span className="w-3.5 h-3.5 rounded-sm bg-current" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={!input.trim()}
              className="h-12 w-12 shrink-0 rounded-xl bg-emerald-600 text-white flex items-center justify-center hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
              aria-label="Send message"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
            </button>
          )}
        </form>
        <p className="mt-2 text-center text-[11px] text-slate-400 dark:text-slate-500">
          AI can make mistakes. Not a fatwa — verify important matters with a qualified scholar.
        </p>
      </div>
    </div>
  );
}
