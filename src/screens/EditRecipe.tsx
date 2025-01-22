import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal, TouchableOpacity, Alert } from 'react-native';
import { updateRecipe } from '../api/apiClient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Recipe } from '../types/types';

interface EditRecipeProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  recipe: Recipe | null;
  loadRecipes: () => Promise<void>;
}

const EditRecipe: React.FC<EditRecipeProps> = ({ modalVisible, setModalVisible, recipe, loadRecipes }) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [rating, setRating] = useState<number>(0);

  useEffect(() => {
    if (recipe) {
      setTitle(recipe.title);
      setDescription(recipe.description || ''); // Perbaiki setDescription
      setImageUrl(recipe.imageUrl || ''); // Perbaiki setImageUrl
      setRating(recipe.rating);
    }
  }, [recipe]);

  const handleUpdateRecipe = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Judul resep tidak boleh kosong');
      return;
    }

    const updatedRecipe = {
      title,
      description,
      imageUrl,
      rating,
      category: recipe?.category || "Main Course",
      ingredients: recipe?.ingredients || [],
      steps: recipe?.steps || [],
      favorites: recipe?.favorites || false,
      reviews: recipe?.reviews || [],
    };

    try {
      if (recipe?.id) {
        await updateRecipe(recipe.id, updatedRecipe);
        loadRecipes();
        setModalVisible(false);
      }
    } catch (error) {
      console.error('Error updating recipe:', error);
      Alert.alert('Error', 'Gagal memperbarui resep');
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Edit Resep</Text>
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

          <TouchableOpacity style={styles.saveButton} onPress={handleUpdateRecipe}>
            <Text style={styles.saveButtonText}>Simpan</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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

export default EditRecipe;