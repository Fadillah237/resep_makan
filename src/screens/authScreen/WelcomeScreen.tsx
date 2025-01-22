import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Define the types for your navigation stack
type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  Home: undefined;
};

type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;

const WelcomeScreen = () => {
  const navigation = useNavigation<WelcomeScreenNavigationProp>();

  return (
    <View style={styles.container}>
      {/* Welcome Message */}
      <Text style={styles.welcomeText}>Selamat Datang di Recipe Tuang!</Text>

      {/* GIF Image */}
      <Image
        source={require('../../assets/welcome.gif')} // Path gambar GIF
        style={styles.gif}
        resizeMode="contain"
      />

      {/* Welcome Title */}
      <Text style={styles.title}>Temukan Resep Lezat di Sini</Text>

      {/* Button Login */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Sudah Punya Akun? Login</Text>
      </TouchableOpacity>

      {/* Button Register */}
      <TouchableOpacity
        style={[styles.button, styles.registerButton]}
        onPress={() => navigation.navigate('Register')}>
        <Text style={styles.buttonText}>Belum Punya Akun? Daftar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fdfdfd',
    padding: 20,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: '600',
    color: '#4e89ae', // Soft blue
    marginBottom: 20,
    textAlign: 'center',
    fontStyle: 'italic',
    letterSpacing: 1.2,
  },
  gif: {
    width: 220,
    height: 220,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
    color: '#7a7a7a', // Grey for subtleness
    marginBottom: 40,
    textAlign: 'center',
    lineHeight: 32,
  },
  button: {
    backgroundColor: '#6a8eae', // Subtle blue
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 16,
    width: '80%',
    alignItems: 'center',
    elevation: 5, // Add slight shadow for depth
  },
  registerButton: {
    backgroundColor: '#5cb85c', // Green for registration
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'uppercase', // Adds a bit of modern style
  },
});

export default WelcomeScreen;