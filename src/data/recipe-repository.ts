import type {
  Recipe,
  RecipeSearchResponse,
} from "../domain/recipe";
import {
  mockSupabase,
  recipeCatalogMeta,
  recipeRowCount,
} from "./mock-supabase";

const STOPWORDS = new Set([
  "a",
  "an",
  "and",
  "for",
  "in",
  "no",
  "of",
  "on",
  "or",
  "the",
  "to",
  "with",
]);

export function normalizeRecipeQuery(query: string) {
  return query
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
}

export async function searchRecipes(
  query: string,
  limit = 8,
): Promise<RecipeSearchResponse> {
  const normalized = normalizeRecipeQuery(query);

  if (!normalized) {
    return { mode: "exact", recipes: [], suggestions: [] };
  }

  const exact = await mockSupabase
    .from("recipes")
    .select("*")
    .ilike("search_text", "%" + normalized + "%")
    .limit(limit);

  if (exact.error) throw new Error(exact.error.message);
  if (exact.data?.length) {
    return { mode: "exact", recipes: exact.data, suggestions: [] };
  }

  const tokens = normalized
    .split(" ")
    .filter((token) => token.length > 1 && !STOPWORDS.has(token));
  if (tokens.length > 1) {
    const partial = await mockSupabase
      .from("recipes")
      .select("*")
      .or(
        tokens
          .map((token) => "search_text.ilike.%" + token + "%")
          .join(","),
      )
      .limit(limit);

    if (partial.error) throw new Error(partial.error.message);
    if (partial.data?.length) {
      return { mode: "partial", recipes: partial.data, suggestions: [] };
    }
  }

  const suggestions = await mockSupabase
    .from("recipes")
    .select("*")
    .limit(4);

  if (suggestions.error) throw new Error(suggestions.error.message);

  return {
    mode: "suggestions",
    recipes: [],
    suggestions: suggestions.data ?? [],
  };
}

export const recipeDatabaseInfo = {
  count: recipeRowCount,
  sourceName: recipeCatalogMeta.sourceName,
  retrievedAt: recipeCatalogMeta.retrievedAt,
};

export type { Recipe };

