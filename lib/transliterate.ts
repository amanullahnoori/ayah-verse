/**
 * Convert English (Roman) Quran transliteration to Hindi (Devanagari) script.
 *
 * This is a phonetic mapping – it turns the Latin-letter pronunciation guide
 * into Devanagari characters so Hindi readers can follow along.
 */

// Mapping of multi-character Roman tokens → Devanagari (longest-match first)
const ROMAN_TO_DEVANAGARI: [string, string][] = [
  // Aspirated / compound consonants (must come before single letters)
  ["tth", "त्थ"],
  ["shh", "ष"],
  ["chh", "छ"],
  ["thh", "थ"],
  ["dhh", "ध"],
  ["phh", "फ"],
  ["kh", "ख"],
  ["gh", "घ"],
  ["ch", "च"],
  ["jh", "झ"],
  ["th", "थ"],
  ["dh", "ध"],
  ["ph", "फ"],
  ["bh", "भ"],
  ["sh", "श"],
  ["ng", "ंग"],
  ["nk", "ंक"],
  ["ny", "ञ"],
  ["aa", "आ"],
  ["ee", "ई"],
  ["oo", "ऊ"],
  ["ai", "ऐ"],
  ["au", "औ"],
  ["ei", "ऐ"],
  ["ou", "औ"],

  // Special Arabic-origin sounds
  ["dz", "ज़"],
  ["zh", "झ़"],
  ["ts", "त्स"],

  // Single consonants
  ["k", "क"],
  ["g", "ग"],
  ["c", "च"],
  ["j", "ज"],
  ["t", "त"],
  ["d", "द"],
  ["n", "न"],
  ["p", "प"],
  ["b", "ब"],
  ["m", "म"],
  ["y", "य"],
  ["r", "र"],
  ["l", "ल"],
  ["v", "व"],
  ["w", "व"],
  ["s", "स"],
  ["h", "ह"],
  ["f", "फ़"],
  ["z", "ज़"],
  ["q", "क़"],
  ["x", "क्स"],

  // Vowels (standalone – used at the start of a word or after another vowel)
  ["a", "अ"],
  ["i", "इ"],
  ["u", "उ"],
  ["e", "ए"],
  ["o", "ओ"],
];

// Vowel matras (used after a consonant)
const VOWEL_MATRAS: Record<string, string> = {
  aa: "ा",
  a: "", // inherent 'a' in Devanagari – no matra needed
  i: "ि",
  ee: "ी",
  u: "ु",
  oo: "ू",
  e: "े",
  ai: "ै",
  ei: "ै",
  o: "ो",
  au: "ौ",
  ou: "ौ",
};

const VOWEL_STARTS = new Set(["a", "i", "u", "e", "o"]);

/**
 * Simple English → Devanagari transliteration.
 *
 * Not perfect for every edge-case but handles the standard AlQuran Cloud
 * `en.transliteration` output well enough for a pronunciation guide.
 */
export function toDevanagari(roman: string): string {
  if (!roman) return roman;

  // Normalise: lowercase, collapse whitespace
  const input = roman.toLowerCase();
  const result: string[] = [];
  let i = 0;

  while (i < input.length) {
    const char = input[i];

    // Pass through non-letter characters
    if (!/[a-z]/.test(char)) {
      result.push(char);
      i++;
      continue;
    }

    // Try longest match first (3, then 2, then 1 character)
    let matched = false;
    for (const [roman_token, devanagari] of ROMAN_TO_DEVANAGARI) {
      const len = roman_token.length;
      if (input.substring(i, i + len).toLowerCase() === roman_token) {
        // Check if this is a vowel token following a consonant
        if (VOWEL_STARTS.has(roman_token[0]) && result.length > 0) {
          const lastChar = result[result.length - 1];
          // If the previous output is a Devanagari consonant, use matra form
          if (lastChar && /[\u0915-\u0939\u0958-\u095F]/.test(lastChar)) {
            const matra = VOWEL_MATRAS[roman_token];
            if (matra !== undefined) {
              result.push(matra);
              i += len;
              matched = true;
              break;
            }
          }
          // Check if last is a matra / vowel sign — treat as standalone vowel
        }
        result.push(devanagari);
        i += len;
        matched = true;
        break;
      }
    }

    if (!matched) {
      result.push(char);
      i++;
    }
  }

  // Add halant (virama) between consecutive consonants where needed
  // (simplified – just pass through for now since the output is readable)
  return result.join("");
}
