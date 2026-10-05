import { checkTranslation } from "@/lib/ai/glossary";
import { API_KEY, callLLMJson, missingKeyResponse } from "@/lib/ai/llm";

const MAX_TEXT_LENGTH = 5000;

const SYSTEM_PROMPT = `You are a translation engine specialised in Islamic (Shar'i) content.
You will receive a short Urdu or Arabic Islamic text (a dua, a hadith explanation, or similar).
Produce STRICT JSON only, with this exact shape, no extra commentary:

{
  "literal": "<a plain, word-for-word style translation into the target language, the way a generic translation tool like Google Translate would likely render it — do NOT special-case Islamic terms here>",
  "contextual": "<an accurate translation into the target language that preserves Islamic terminology correctly: proper nouns like 'Allah' are kept as-is (never 'God'), terms such as Tawheed, Shirk, Aqeedah, Dua, I'tikaf, Umrah, Sunnah are transliterated with a short parenthetical gloss on first use, and the religious meaning is not flattened or distorted>",
  "notes": "<one short sentence (in the target language) pointing out the single most important difference between the two translations above, for a general reader>"
}

Target language for this request: {{TARGET_LANG}}
Return ONLY the JSON object, nothing else.`;

type TranslateResult = { literal?: string; contextual?: string; notes?: string };

export async function POST(req: Request) {
  try {
    const { text, targetLang } = await req.json().catch(() => ({}));

    if (!text || typeof text !== "string" || !text.trim()) {
      return Response.json(
        { error: "Missing 'text' in request body." },
        { status: 400 },
      );
    }
    if (text.length > MAX_TEXT_LENGTH) {
      return Response.json(
        { error: `Text is too long (max ${MAX_TEXT_LENGTH} characters).` },
        { status: 400 },
      );
    }
    if (!API_KEY) return missingKeyResponse();

    const lang = targetLang === "ar" ? "Arabic" : "English";
    const result = await callLLMJson<TranslateResult>(
      [
        { role: "system", content: SYSTEM_PROMPT.replace("{{TARGET_LANG}}", lang) },
        { role: "user", content: text.trim() },
      ],
      0.2,
      "Model did not return valid JSON.",
    );
    if ("error" in result) return result.error;

    const parsed = result.data;
    const literalFlags = checkTranslation(parsed.literal || "");
    const contextualFlags = checkTranslation(parsed.contextual || "");

    return Response.json({
      source: text.trim(),
      targetLang: lang,
      literal: parsed.literal || "",
      contextual: parsed.contextual || "",
      notes: parsed.notes || "",
      safetyCheck: {
        literalFlags,
        contextualFlags,
        passed: contextualFlags.length === 0,
      },
    });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Internal server error." }, { status: 500 });
  }
}
