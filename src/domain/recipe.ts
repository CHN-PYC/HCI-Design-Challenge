import type { FoodGlyphName } from "./food-glyph";

export type RecipeOrigin = "nutripal" | "themealdb";

export interface Recipe {
  id: string;
  title: string;
  category: string;
  area: string;
  ingredients: string[];
  glyph: FoodGlyphName;
  origin: RecipeOrigin;
  sourceName: string;
  sourceUrl?: string;
  externalId?: string;
  keywords: string[];
  searchText: string;
  minutes?: number;
  calories?: number;
  price?: string;
  reason?: string;
}

export interface RecipeCatalogMeta {
  sourceName: string;
  sourceUrl: string;
  retrievedAt: string;
  categories: string[];
  note: string;
}

export interface RecipeCatalog {
  meta: RecipeCatalogMeta;
  recipes: Recipe[];
}

export type RecipeSearchMode = "exact" | "partial" | "suggestions";

export interface RecipeSearchResponse {
  mode: RecipeSearchMode;
  recipes: Recipe[];
  suggestions: Recipe[];
}

