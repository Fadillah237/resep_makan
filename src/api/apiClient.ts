import axios from 'axios';

// Konfigurasi dasar axios
const apiClient = axios.create({
  baseURL: 'https://673de9f50118dbfe8609510c.mockapi.io',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Fungsi untuk mendapatkan daftar resep
export const getRecipes = async () => {
  try {
    const response = await apiClient.get('/resep');
    return response.data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw new Error('Failed to fetch recipes');
  }
};

// Fungsi untuk menambahkan resep baru
export const addRecipe = async (recipe: any) => {
  try {
    const response = await apiClient.post('/resep', recipe);
    return response.data;
  } catch (error) {
    console.error('Error adding recipe:', error);
    throw new Error('Failed to add recipe');
  }
};

// Fungsi untuk memperbarui resep yang ada
export const updateRecipe = async (id: string, updatedRecipe: any) => {
  try {
    const response = await apiClient.put(`/resep/${id}`, updatedRecipe);
    return response.data;
  } catch (error) {
    console.error('Error updating recipe:', error);
    throw new Error('Failed to update recipe');
  }
};

// Fungsi untuk menghapus resep
export const deleteRecipe = async (id: string) => {
  try {
    const response = await apiClient.delete(`/resep/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting recipe:', error);
    throw new Error('Failed to delete recipe');
  }
};

export default apiClient;