import axios from 'axios';

// Fungsi untuk mendapatkan data resep
export const getRecipes = async () => {
  try {
    const response = await axios.get('https://673de9f50118dbfe8609510c.mockapi.io/resep');
    return response.data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw new Error('Failed to fetch recipes');
  }
};
