import { useState, useEffect } from 'react';
import { fetchFavoriteRecipes } from '../firebase/firestore';
import { Recipe } from '../types/types'; // Pastikan Anda mengimpor tipe Recipe

export const useFavoriteRecipes = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadFavoriteRecipes = async () => {
      try {
        const recipes = await fetchFavoriteRecipes();
        setFavoriteRecipes(recipes as Recipe[]); // Pastikan tipe data sesuai dengan Recipe
      } catch (error) {
        console.error('Error loading favorite recipes:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFavoriteRecipes();
  }, []);

  return { favoriteRecipes, loading };
};