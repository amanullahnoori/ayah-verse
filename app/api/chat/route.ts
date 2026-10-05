import { getRelevantContent } from "@/lib/ai/content";
import { GLOSSARY } from "@/lib/ai/glossary";
import {
  API_KEY,
  callLLM,
  missingKeyResponse,
  upstreamErrorResponse,
  type ChatMessage,
} from "@/lib/ai/llm";

const MAX_HISTORY = 12;
const MAX_MESSAGE_LENGTH = 4000;

const chatSystemPrompt = (verifiedContent: object) => `You are the AyahVerse AI assistant, a knowledgeable, warm and careful guide inside a Quran app. You help users understand the Quran, duas, adhkar, the 99 Names of Allah, Umrah, and general Islamic knowledge.

Reliability rules (follow strictly):
1. Prefer the VERIFIED CONTENT below whenever it covers the question, and mention when your answer comes from AyahVerse's verified content.
2. When citing the Quran, give Surah name and ayah number (e.g. Al-Baqarah 2:255). When citing hadith, name the collection. Only cite references you are confident are correct — never invent a reference, hadith, or wording.
3. Do not issue fatwas. For personal rulings, contested fiqh matters, or anything you are unsure about, say so honestly and recommend consulting a qualified scholar.
4. Preserve Islamic terminology: ${GLOSSARY.map((g) => `${g.preserve} — ${g.note}`).join(" ")}
5. Use ﷺ after mentioning the Prophet Muhammad.
6. Reply in the same language the user writes in (English, Arabic, Urdu, Hindi, Bengali, etc.).
7. Keep answers clear and concise. You may use short paragraphs, "- " bullet lists, "> " quotes and **bold**; do not use tables. Write Arabic text of duas and ayat in Arabic script, followed by transliteration and meaning when helpful.
8. Politely decline requests unrelated to Islam, the Quran, or this app.

VERIFIED CONTENT (only the parts relevant to this conversation; may be empty):
${JSON.stringify(verifiedContent)}`;

function parseMessages(input: unknown): ChatMessage[] | null {
  if (!Array.isArray(input) || input.length === 0) return null;
  const messages: ChatMessage[] = [];
  for (const m of input.slice(-MAX_HISTORY)) {
    if (
      !m ||
      (m.role !== "user" && m.role !== "assistant") ||
      typeof m.content !== "string" ||
      !m.content.trim()
    ) {
      return null;
    }
    messages.push({ role: m.role, content: m.content.slice(0, MAX_MESSAGE_LENGTH) });
  }
  return messages[messages.length - 1].role === "user" ? messages : null;
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const messages = parseMessages(body.messages);
  if (!messages) {
    return Response.json(
      { error: "Invalid 'messages': expected a non-empty conversation ending with a user message." },
      { status: 400 },
    );
  }
  if (!API_KEY) return missingKeyResponse();

  const recentUserText = messages
    .filter((m) => m.role === "user")
    .slice(-3)
    .map((m) => m.content)
    .join("\n");

  let upstream: Response;
  try {
    upstream = await callLLM(
      [
        { role: "system", content: chatSystemPrompt(getRelevantContent(recentUserText)) },
        ...messages,
      ],
      { temperature: 0.3, stream: true, signal: req.signal },
    );
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Could not reach the AI service." }, { status: 502 });
  }

  if (!upstream.ok || !upstream.body) return upstreamErrorResponse(upstream);

  // Convert the upstream SSE stream into a plain text stream of content deltas.
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let buffer = "";

  const stream = upstream.body.pipeThrough(
    new TransformStream<Uint8Array, Uint8Array>({
      transform(chunk, controller) {
        buffer += decoder.decode(chunk, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith("data:")) continue;
          const data = trimmed.slice(5).trim();
          if (data === "[DONE]") continue;
          try {
            const delta = JSON.parse(data).choices?.[0]?.delta?.content;
            if (delta) controller.enqueue(encoder.encode(delta));
          } catch {
            // ignore keep-alive or partial lines
          }
        }
      },
    }),
  );

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
    },
  });
}
