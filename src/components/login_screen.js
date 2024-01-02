import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import * as server from 'E:/Schoolworks/Docker/Final_project/Group-planning/src/server/AuthService.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from '../server/AuthService.js'; 

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const auth = useContext(AuthContext);

  if (!auth) {
    
    return <View><Text>Auth context is not available.</Text></View>;
  }

  useEffect(() => {
    const loadCredentials = async () => {
      const savedUsername = await AsyncStorage.getItem('username');
      const savedPassword = await AsyncStorage.getItem('password');
      if (savedUsername && savedPassword) {
        setUsername(savedUsername);
        setPassword(savedPassword);
      }
    };

    loadCredentials();
  }, []);

  const saveCredentials = async (username, password) => {
    try {
      await AsyncStorage.setItem('username', username);
      await AsyncStorage.setItem('password', password);
    } catch (error) {
      // Error saving data
      console.error('AsyncStorage error: ', error.message);
    }
  };

  const handleLogin = () => {
    server.connectSocket();

    server.login(username, password)
      .then((success) => {
        
        if (success) {
         saveCredentials(username, password);
         auth.login();
         navigation.navigate('sharedproject'); 
      
        }
      })
      .catch((error) => {
        setIsLoggingIn(false); 
    
      });

  };

  const handleCancel = () => {
   
    console.log('Cancel pressed');
  };

  const handleSignUp = () => {

    navigation.navigate('SignUp');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log In</Text>
      <TextInput
        style={styles.input}
        placeholder="User Name"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleCancel}>
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.buttonSignIn]} onPress={handleLogin}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <Text style={styles.signUpText}>
        Don't have an account?{' '}
        <Text style={styles.signUpButton} onPress={handleSignUp}>
          Sign Up
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    marginVertical: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
  },
  button: {
    width: '100%',
    padding: 15,
    marginVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonSignIn: {
    backgroundColor: '#007bff',
  },
  buttonText: {
    color: 'white',
  },
  signUpText: {
    marginTop: 10,
  },
  signUpButton: {
    color: 'blue',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
