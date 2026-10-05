import { API_KEY, missingKeyResponse } from "@/lib/ai/llm";

export async function GET() {
  if (!API_KEY) return missingKeyResponse();
  try {
    const response = await fetch("https://api.groq.com/openai/v1/models", {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return Response.json(
        { error: "Failed to fetch models from Groq." },
        { status: response.status },
      );
    }

    const data = await response.json();
    const availableModels = data.data.map((model: { id: string }) => model.id);
    return Response.json({ availableModels });
  } catch (err) {
    return Response.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 500 },
    );
  }
}
