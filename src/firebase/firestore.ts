import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';
import { firestore } from './config'; // Pastikan Anda sudah mengonfigurasi Firestore di `config.ts`

// Menambahkan resep baru
export const addRecipe = async (
  title: string,
  description: string,
  imageUrl: string,
  rating: number
) => {
  try {
    const docRef = await addDoc(collection(firestore, 'recipes'), {
      title,
      description,
      imageUrl,
      rating,
      created_at: new Date().toISOString(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding recipe:', error);
    throw error;
  }
};

// Mengambil resep
export const fetchRecipes = async () => {
  try {
    const querySnapshot = await getDocs(collection(firestore, 'recipes'));
    const recipesArray = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return recipesArray;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
};

// Memperbarui resep (misalnya rating)
export const updateRecipe = async (id: string, updatedData: object) => {
  try {
    const docRef = doc(firestore, 'recipes', id);
    await updateDoc(docRef, updatedData);
    console.log('Recipe updated successfully');
  } catch (error) {
    console.error('Error updating recipe:', error);
    throw error;
  }
};

// Menghapus resep
export const deleteRecipe = async (id: string) => {
  try {
    const docRef = doc(firestore, 'recipes', id);
    await deleteDoc(docRef);
    console.log('Recipe deleted');
  } catch (error) {
    console.error('Error deleting recipe:', error);
    throw error;
  }
};

// Memperbarui status resep (misalnya untuk favorit)
export const updateRecipeStatus = async (id: string, isFavorite: boolean) => {
  try {
    const recipeRef = doc(firestore, 'recipes', id);
    await updateDoc(recipeRef, { isFavorite });
    console.log('Recipe status updated');
  } catch (error) {
    console.error('Error updating recipe status:', error);
    throw error;
  }
};