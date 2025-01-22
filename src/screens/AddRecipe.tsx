import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal, TouchableOpacity, Alert } from 'react-native';
import { addRecipe } from '../api/apiClient';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface AddRecipeProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  loadRecipes: () => Promise<void>;
}

const AddRecipe: React.FC<AddRecipeProps> = ({ modalVisible, setModalVisible, loadRecipes }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [rating, setRating] = useState(0);

  const handleAddRecipe = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Judul resep tidak boleh kosong');
      return;
    }

    const newRecipe = {
      title,
      description,
      imageUrl,
      rating,
      category: "Main Course", 
      ingredients: [],
      steps: [],
      favorites: false,
      reviews: [],
    };

    try {
      await addRecipe(newRecipe);
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

          <TouchableOpacity style={styles.saveButton} onPress={handleAddRecipe}>
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

export default AddRecipe;