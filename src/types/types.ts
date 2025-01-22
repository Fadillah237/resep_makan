// src/types/types.ts
export type Recipe = {
  id: number;
  title: string;
  category: string;
  ingredients: string;
  steps: string;
  imageUrl: string;
  rating: number;
  favorites: boolean;
  reviews: string;
  created_at: string;
};