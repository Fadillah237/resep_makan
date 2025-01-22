import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import RecipeCard from '../components/RecipeCard';
import { getRecipes, deleteRecipe } from '../api/apiClient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Recipe } from '../types/types';
import AddRecipe from './AddRecipe';
import EditRecipe from './EditRecipe';

const HomeScreen = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const loadRecipes = async () => {
    try {
      const result = await getRecipes();
      console.log(result);
      setRecipes(result as Recipe[]);
    } catch (error) {
      console.error('Error loading recipes:', error);
      Alert.alert('Error', 'Failed to load recipes');
    }
  };

  useEffect(() => {
    loadRecipes();
  }, []);

  const handleDeleteRecipe = async (id: string) => {
    try {
      await deleteRecipe(id);
      loadRecipes();
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  const handleEditRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setEditModalVisible(true);
  };

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Daftar Resep ({recipes.length})</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Cari resep..."
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
        </View>

        {filteredRecipes.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Tidak ada resep</Text>
            <Text style={styles.emptySubtext}>
              Tambahkan resep baru dengan menekan tombol di bawah
            </Text>
          </View>
        ) : (
          <FlatList
            data={filteredRecipes}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <RecipeCard
                recipe={item}
                onDelete={() => handleDeleteRecipe(item.id)}
                onEdit={() => handleEditRecipe(item)}
                style={styles.recipeCard}
              />
            )}
          />
        )}

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Icon name="add-circle" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <AddRecipe
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        loadRecipes={loadRecipes}
      />

      <EditRecipe
        modalVisible={editModalVisible}
        setModalVisible={setEditModalVisible}
        recipe={selectedRecipe}
        loadRecipes={loadRecipes}
      />

      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem}>
          <Icon name="home" size={28} color="#007bff" />
          <Text style={styles.tabText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Icon name="favorite" size={28} color="#007bff" />
          <Text style={styles.tabText}>Favorit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Icon name="person" size={28} color="#007bff" />
          <Text style={styles.tabText}>Profil</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  headerContainer: {
    width: '100%',
    marginBottom: 16,
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 4,
    padding: 10,
    marginTop: 12,
    marginBottom: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6c757d',
  },
  emptySubtext: {
    marginTop: 8,
    color: '#6c757d',
  },
  addButton: {
    backgroundColor: '#007bff',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  recipeCard: {
    marginBottom: 12,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#f1f1f1',
  },
  tabItem: {
    alignItems: 'center',
  },
  tabText: {
    color: '#007bff',
    fontSize: 12,
    marginTop: 4,
  },
});

export default HomeScreen;