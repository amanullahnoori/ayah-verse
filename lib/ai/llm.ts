export const API_KEY = process.env.GROQ_API_KEY;
export const BASE_URL =
  process.env.LLM_BASE_URL || "https://api.groq.com/openai/v1/chat/completions";
export const MODEL = process.env.LLM_MODEL || "openai/gpt-oss-120b";

export type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export const missingKeyResponse = () =>
  Response.json(
    {
      error:
        "Server is missing GROQ_API_KEY. Set it in .env.local (see README).",
    },
    { status: 500 },
  );

export async function upstreamErrorResponse(response: Response) {
  const errText = await response.text();
  console.error("LLM API error:", response.status, errText);
  if (response.status === 429) {
    return Response.json(
      {
        error: "The AI service is busy right now. Please wait a few seconds and try again.",
        detail: errText,
      },
      { status: 429 },
    );
  }
  return Response.json(
    { error: "Upstream model call failed.", detail: errText },
    { status: 502 },
  );
}

export function callLLM(
  messages: ChatMessage[],
  opts: { temperature: number; json?: boolean; stream?: boolean; signal?: AbortSignal },
) {
  return fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: MODEL,
      temperature: opts.temperature,
      ...(opts.json && { response_format: { type: "json_object" } }),
      ...(opts.stream && { stream: true }),
      messages,
    }),
    signal: opts.signal,
  });
}

// Returns either the parsed JSON object or a ready-to-send error Response.
export async function callLLMJson<T>(
  messages: ChatMessage[],
  temperature: number,
  invalidJsonError: string,
): Promise<{ data: T } | { error: Response }> {
  const response = await callLLM(messages, { temperature, json: true });
  if (!response.ok) return { error: await upstreamErrorResponse(response) };

  const body = await response.json();
  const raw: string = body.choices?.[0]?.message?.content || "{}";
  try {
    return { data: JSON.parse(raw) as T };
  } catch {
    console.error("Failed to parse model JSON:", raw);
    return {
      error: Response.json({ error: invalidJsonError, raw }, { status: 502 }),
    };
  }
}
