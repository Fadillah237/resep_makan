import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useFavoriteRecipes } from '../hooks/useFavoriteRecipes'; // Custom hook untuk mendapatkan resep favorit
import RecipeCard from '../components/RecipeCard';
import { Recipe } from '../types/types'; // Impor tipe Recipe

const FavoriteScreen = () => {
  const { favoriteRecipes, loading } = useFavoriteRecipes();

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Favorit Saya</Text>
      {favoriteRecipes.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Tidak ada resep favorit</Text>
        </View>
      ) : (
        <FlatList
          data={favoriteRecipes}
          keyExtractor={(item: Recipe) => item.id.toString()} // Perbaiki keyExtractor untuk mengembalikan string
          renderItem={({ item }) => (
            <RecipeCard recipe={item} onDelete={() => {}} /> // Sesuaikan onDelete jika diperlukan
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#6c757d',
  },
});

export default FavoriteScreen;