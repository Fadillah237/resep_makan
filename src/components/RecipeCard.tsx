import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

type RecipeCardProps = {
  recipe: {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
  };
  onDelete: () => void;
  style?: object;  // Tambahkan properti style opsional
};

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onDelete, style }) => {
  return (
    <View style={[styles.card, style]}> {/* Terapkan style jika ada */}
      <Image source={{ uri: recipe.imageUrl }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title}>{recipe.title}</Text>
        <Text style={styles.description}>{recipe.description}</Text>
      </View>
      <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
        <Text style={styles.deleteText}>Hapus</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  details: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    color: '#6c757d',
  },
  deleteButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f44336',
    padding: 8,
    borderRadius: 8,
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default RecipeCard;