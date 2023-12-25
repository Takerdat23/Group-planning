import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import * as FileSystem from 'expo-file-system';
import { StatusBar } from 'expo-status-bar';
import LoginScreen from './src/components/login_screen.js';
import HelloWorldScreen from './src/components/helloworldscreen'; 
import WelcomeScreen from './src/components/welcomescreen.js'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, CardStyleInterpolators } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {
  const handleLogin = (username, password) => {
    console.log('Login attempt with:', username, password);
  };

  return (
    <NavigationContainer>
      
      <Stack.Navigator
        initialRouteName="WelcomeScreen"
        screenOptions={{
          animation: 'slide_from_right', 
        }}
      >
        <Stack.Screen 
          name="WelcomeScreen" 
          component={WelcomeScreen} 
          options={{ headerShown: false }} 
        />

        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} 
        />

        <Stack.Screen 
          name="HelloWorld" 
          component={HelloWorldScreen} 
          options={{ title: 'Welcome' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default App;
