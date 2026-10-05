import type { Metadata } from "next";
import AIClient from "./AIClient";

export const metadata: Metadata = {
  title: "AI Assistant",
  description:
    "Chat with the AyahVerse AI assistant about the Quran, duas, the 99 Names of Allah and Umrah. Includes Shar'i-term-aware translation and verified Q&A with citations.",
  keywords: [
    "Islamic AI assistant",
    "Quran AI",
    "Islamic translation",
    "Dua translation",
    "Islamic Q&A",
  ],
};

export default function AIPage() {
  return <AIClient />;
}
