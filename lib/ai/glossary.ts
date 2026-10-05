export interface GlossaryEntry {
  term: string;
  preserve: string;
  forbidden: string[];
  note: string;
}

export interface GlossaryFlag {
  term: string;
  flaggedWord: string;
  expected: string;
  note: string;
}

export const GLOSSARY: GlossaryEntry[] = [
  {
    term: "الله",
    preserve: "Allah",
    forbidden: ["god", "the god", "a god"],
    note: "Allah is a proper noun, not a generic word for 'a god'.",
  },
  {
    term: "توحید",
    preserve: "Tawheed (the Oneness of Allah)",
    forbidden: ["monotheism"],
    note: "'Monotheism' is a belief category; Tawheed is a specific Islamic creedal concept.",
  },
  {
    term: "شرک",
    preserve: "Shirk (associating partners with Allah)",
    forbidden: ["polytheism", "idolatry"],
    note: "Shirk has a precise theological meaning broader than 'polytheism'.",
  },
  {
    term: "عقیدہ",
    preserve: "Aqeedah (Islamic creed)",
    forbidden: ["ideology", "belief system"],
    note: "Aqeedah refers specifically to Islamic articles of faith.",
  },
  {
    term: "دعا",
    preserve: "Dua (supplication)",
    forbidden: ["prayer"],
    note: "Dua and Salah (ritual prayer) are distinct; conflating them causes confusion.",
  },
  {
    term: "اعتکاف",
    preserve: "I'tikaf (spiritual retreat in the mosque)",
    forbidden: ["isolation", "retreat"],
    note: "A specific worship ritual performed in the mosque, not generic retreat.",
  },
  {
    term: "عمرہ",
    preserve: "Umrah",
    forbidden: ["pilgrimage"],
    note: "Umrah is distinct from Hajj; 'pilgrimage' alone loses that distinction.",
  },
  {
    term: "سنت",
    preserve: "Sunnah (the Prophet's ﷺ practice)",
    forbidden: ["tradition", "custom"],
    note: "Sunnah carries normative religious weight beyond 'tradition'.",
  },
];

export function checkTranslation(translatedText: string): GlossaryFlag[] {
  const lower = translatedText.toLowerCase();
  const flags: GlossaryFlag[] = [];
  for (const entry of GLOSSARY) {
    for (const bad of entry.forbidden) {
      const pattern = new RegExp(`\\b${bad}\\b`, "i");
      if (
        pattern.test(lower) &&
        !lower.includes(entry.preserve.toLowerCase().split(" ")[0])
      ) {
        flags.push({
          term: entry.term,
          flaggedWord: bad,
          expected: entry.preserve,
          note: entry.note,
        });
        break;
      }
    }
  }
  return flags;
}
