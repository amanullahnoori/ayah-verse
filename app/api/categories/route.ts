import { CATEGORY_LABELS, getCategory, type CategoryKey } from "@/lib/ai/content";

export function GET() {
  const categories = (Object.keys(CATEGORY_LABELS) as CategoryKey[]).map(
    (key) => ({
      key,
      label: CATEGORY_LABELS[key],
      count: getCategory(key)?.items?.length || 0,
    }),
  );
  return Response.json({ categories });
}
