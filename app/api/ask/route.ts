import { getCategory, isCategory } from "@/lib/ai/content";
import { checkTranslation } from "@/lib/ai/glossary";
import { API_KEY, callLLMJson, missingKeyResponse } from "@/lib/ai/llm";

const MAX_QUESTION_LENGTH = 2000;

const QA_SYSTEM_PROMPT = `You are a careful Q&A assistant for an Islamic content app.
You will be given CONTENT (a specific category of verified Islamic reference material) and a user QUESTION.

Rules (follow strictly):
1. Answer ONLY using facts present in the CONTENT below. Never use outside knowledge, never guess, never infer a ruling.
2. If the CONTENT does not contain enough information to answer, say so plainly and suggest the user consult a qualified scholar. Do NOT attempt to answer anyway.
3. Always cite exactly which item(s) from the CONTENT your answer is based on (by its Arabic text or transliteration).
4. Keep the answer concise and respectful in tone.
5. Respond in {{TARGET_LANG}}.

Return STRICT JSON only, in this shape:
{
  "answer": "<the answer, or a clear refusal + referral to a scholar if not found in CONTENT>",
  "cited": ["<short identifier of each source item used, empty array if none>"],
  "found_in_content": true | false
}

CONTENT:
{{CONTENT}}`;

type AskResult = { answer?: string; cited?: string[]; found_in_content?: boolean };

export async function POST(req: Request) {
  try {
    const { category, question, targetLang } = await req.json().catch(() => ({}));

    if (!isCategory(category)) {
      return Response.json(
        { error: "Unknown or missing 'category'." },
        { status: 400 },
      );
    }
    if (!question || typeof question !== "string" || !question.trim()) {
      return Response.json({ error: "Missing 'question'." }, { status: 400 });
    }
    if (question.length > MAX_QUESTION_LENGTH) {
      return Response.json(
        { error: `Question is too long (max ${MAX_QUESTION_LENGTH} characters).` },
        { status: 400 },
      );
    }
    if (!API_KEY) return missingKeyResponse();

    const lang = targetLang === "ar" ? "Arabic" : "English";
    const systemPrompt = QA_SYSTEM_PROMPT.replace("{{TARGET_LANG}}", lang).replace(
      "{{CONTENT}}",
      JSON.stringify(getCategory(category), null, 2),
    );

    const result = await callLLMJson<AskResult>(
      [
        { role: "system", content: systemPrompt },
        { role: "user", content: question.trim() },
      ],
      0,
      "Model did not return valid JSON for Q&A.",
    );
    if ("error" in result) return result.error;

    const parsed = result.data;
    const answer = parsed.answer || "";
    const flags = lang === "English" ? checkTranslation(answer) : [];

    return Response.json({
      category,
      question: question.trim(),
      answer,
      cited: parsed.cited || [],
      foundInContent: parsed.found_in_content ?? false,
      safetyCheck: { flags, passed: flags.length === 0 },
    });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Internal server error." }, { status: 500 });
  }
}
