import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, Alert, TextInput } from 'react-native';
import RecipeCard from '../components/RecipeCard';
import { addRecipe, deleteRecipe, fetchRecipes } from '../firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import MaterialIcons dari react-native-vector-icons

// Definisikan tipe untuk objek Recipe
interface Recipe {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  rating: number;
}

const HomeScreen = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [rating, setRating] = useState<number>(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Memuat resep dari Firestore saat komponen pertama kali dirender
  const loadRecipes = async () => {
    try {
      const result = await fetchRecipes();
      console.log(result);
      setRecipes(result as Recipe[]); // Pastikan tipe data sesuai dengan Recipe[]
    } catch (error) {
      console.error('Error loading recipes:', error);
    }
  };

  useEffect(() => {
    loadRecipes();
  }, []);

  // Menambah resep baru ke Firestore
  const handleAddRecipe = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Judul resep tidak boleh kosong');
      return;
    }

    try {
      await addRecipe(title, description, imageUrl, rating);
      loadRecipes();
      setTitle('');
      setDescription('');
      setImageUrl('');
      setRating(0);
      setModalVisible(false);
    } catch (error) {
      console.error('Error adding recipe:', error);
      Alert.alert('Error', 'Gagal menambahkan resep');
    }
  };

  // Menghapus resep dari Firestore
  const handleDeleteRecipe = async (id: string) => {
    try {
      await deleteRecipe(id);
      loadRecipes();
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  // Memfilter resep berdasarkan query pencarian
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
                style={styles.recipeCard}
              />
            )}
          />
        )}

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}>
          <Icon name="add-circle" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Tab Bar */}
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

      {/* Modal untuk tambah resep */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Tambah Resep</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Icon name="close-circle" size={24} color="gray" />
              </TouchableOpacity>
            </View>

            <Text style={styles.inputLabel}>Judul Resep</Text>
            <TextInput
              style={styles.inputField}
              value={title}
              onChangeText={(text) => setTitle(text)}
            />

            <Text style={styles.inputLabel}>Deskripsi</Text>
            <TextInput
              style={styles.inputField}
              value={description}
              onChangeText={(text) => setDescription(text)}
            />

            <Text style={styles.inputLabel}>Gambar (URL)</Text>
            <TextInput
              style={styles.inputField}
              value={imageUrl}
              onChangeText={(text) => setImageUrl(text)}
            />

            <Text style={styles.inputLabel}>Rating</Text>
            <TextInput
              style={styles.inputField}
              value={rating.toString()}
              onChangeText={(text) => setRating(parseInt(text))}
              keyboardType="numeric"
            />

            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleAddRecipe}>
              <Text style={styles.saveButtonText}>Simpan</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    paddingHorizontal: 14,
    paddingVertical: 16,
    borderRadius: 8,
    width: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  inputLabel: {
    marginBottom: 8,
    color: '#6c757d',
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 4,
    padding: 10,
    marginBottom: 12,
  },
  saveButton: {
    backgroundColor: '#28a745',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default HomeScreen;