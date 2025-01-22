import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import Login from './src/screens/authScreen/Login';
import Register from './src/screens/authScreen/Register';
import WelcomeScreen from './src/screens/authScreen/WelcomeScreen';
import RecipeListScreen from './src/screens/RecipeListScreen'; // Import RecipeListScreen

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome" // Set Welcome sebagai layar awal
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Recipes" component={RecipeListScreen} /> {/* Tambahkan RecipeListScreen */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;