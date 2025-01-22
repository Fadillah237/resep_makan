import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TextInput,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../../firebase/config';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Email dan password tidak boleh kosong!');
      return;
    }

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      Alert.alert('Success', 'Login berhasil!');
      navigation.reset({
        index: 0,
        routes: [{name: 'Home' as never}],
      });
      setEmail('');
      setPassword('');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Gagal login!');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/welcome.gif')} // Ganti dengan path GIF Anda
        style={styles.gif}
        resizeMode="contain"
      />
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Text
        style={styles.registerText}
        onPress={() => navigation.navigate('Register' as never)}>
        Belum punya akun? Register
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  gif: {
    width: 200,
    height: 200,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 4,
    padding: 10,
    marginBottom: 12,
    width: '100%',
  },
  button: {
    backgroundColor: 'blue',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerText: {
    color: 'blue',
    textAlign: 'center',
    marginTop: 12,
  },
});

export default Login;
