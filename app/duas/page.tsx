import { Metadata } from "next";
import DuasClient from "./DuasClient";

export const metadata: Metadata = {
  title: "Islamic Duas & Azkar",
  description:
    "Comprehensive collection of authentic Islamic supplications, remembrances, and the 99 names of Allah. Features Arabic text, transliteration, and English translation.",
  keywords: [
    "Duas",
    "Azkar",
    "Islamic supplications",
    "Morning Azkar",
    "Evening Azkar",
    "Prayer Duas",
    "Asma ul Husna",
    "99 names of Allah",
    "Islamic prayers",
  ],
};

export default function DuasPage() {
  return <DuasClient />;
}
