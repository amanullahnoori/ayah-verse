import { Metadata } from "next";
import AsmaUlHusnaClient from "./AsmaUlHusnaClient";

export const metadata: Metadata = {
  title: "Allah's 99 Beautiful Names",
  description:
    "Explore Allah's 99 beautiful names (Asma-ul-Husna) with Arabic text, transliteration, and detailed meanings. Reflect on divine attributes, search by name, and deepen your spiritual connection.",
  keywords: [
    "Asma ul Husna",
    "99 names of Allah",
    "Allah's names",
    "Divine attributes",
    "Islamic spirituality",
    "Quranic names",
    "Allah's qualities",
    "Islamic app",
    "Spiritual growth",
  ],
};

export default function AsmaUlHusnaPage() {
  return <AsmaUlHusnaClient />;
}
