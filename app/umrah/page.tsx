import { Metadata } from "next";
import UmrahClient from "./UmrahClient";

export const metadata: Metadata = {
  title: "Umrah Guide with Duas",
  description:
    "Complete Umrah guide with authentic duas and supplications for every stage. Features Arabic text, transliteration, and English translation for the sacred pilgrimage.",
  keywords: [
    "Umrah",
    "Hajj",
    "Pilgrimage",
    "Umrah guide",
    "Islamic duas",
    "Talbiyah",
    "Tawaf",
    "Sai",
    "Hajj duas",
    "Islamic pilgrimage",
  ],
};

export default function UmrahPage() {
  return <UmrahClient />;
}
