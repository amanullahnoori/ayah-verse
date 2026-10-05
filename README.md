This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## AI Assistant (`/ai`)

The AI features run as Next.js route handlers, so no separate backend is needed:

| Endpoint | Purpose |
| --- | --- |
| `POST /api/chat` | Streaming chat with the AyahVerse assistant |
| `POST /api/translate` | Literal vs. Shar'i-term-aware contextual translation, with glossary safety check |
| `POST /api/ask` | Q&A answered only from the verified content in `lib/ai/dataset.json`, with citations |
| `GET /api/categories` | Categories available to `/api/ask` |
| `GET /api/check-models` | Lists models available on the configured Groq key |

Create `.env.local` with a [Groq API key](https://console.groq.com/keys) (also add it to your Vercel project's environment variables):

```bash
GROQ_API_KEY=your-key
# Optional, any OpenAI-compatible provider works:
# LLM_BASE_URL=https://api.groq.com/openai/v1/chat/completions
# LLM_MODEL=openai/gpt-oss-120b
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
