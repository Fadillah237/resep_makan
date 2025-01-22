import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://example.com/your-profile-picture.jpg' }} // Ganti dengan URL gambar profil Anda
        style={styles.profileImage}
      />
      <Text style={styles.nameText}>Nama Pengguna</Text>
      <Text style={styles.emailText}>email@example.com</Text>
      {/* Tambahkan detail profil lainnya di sini */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  emailText: {
    fontSize: 18,
    color: '#6c757d',
  },
});

export default ProfileScreen;