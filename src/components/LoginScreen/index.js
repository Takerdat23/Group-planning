import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import styles from './styles.js'
import { login } from '../../server/AuthService.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from '../../server/AuthService.js'; 
import { useShared, useUser } from '../../server/context.js'; 
import { ttuser, uEmail } from '../../server/socket.js';



const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { user, setUser, userData, setUserData } = useUser();
    const { sharedProjects, setSharedProjects } = useShared()
  
    const auth = useContext(AuthContext);
  
    if (!auth) {
      
      return <View><Text>Auth context is not available.</Text></View>;
    }
  
    useEffect(() => {
      const loadCredentials = async () => {
        const savedEmail = await AsyncStorage.getItem('email');
        const savedPassword = await AsyncStorage.getItem('password');
        if (savedEmail && savedPassword) {
          setEmail(savedEmail);
          setPassword(savedPassword);
        }
      };
  
      loadCredentials();
    }, []);
  
    const saveCredentials = async (email, password) => {
      try {
        await AsyncStorage.setItem('email', email);
        await AsyncStorage.setItem('password', password);
      } catch (error) {
        // Error saving data
        console.error('AsyncStorage error: ', error.message);
      }
    };
  
    const handleLogin = () => { 
      setLoading(true);
      setError('');
    
      const loginPromise = login(email, password)
      loginPromise.then(
        (data) => {
          saveCredentials(email, password);
          auth.login();
          setUser(email)
          setUserData({
            name: data.name,
            email: data.email,
          })
          uEmail.value = data.email
          ttuser.value = data.projects
          console.log(uEmail, ttuser.value.length)
          setLoading(false);

          navigation.navigate('Shared');
        }, (error) => {
          setLoading(false);
          setError(error); 
        })
    };
  
    const handleCancel = () => {
      navigation.navigate('PersonalProject'); 
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
          placeholder="Email"
          autoCapitalize='none'
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          autoCapitalize='none'
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        
        <TouchableOpacity style={[styles.button, styles.buttonSignIn]} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.buttonSignIn]} onPress={handleCancel}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        {loading && <ActivityIndicator size="large" color="#0000ff" />}
        <Text style={styles.errorText}>{error}</Text>
        <Text style={styles.signUpText}>
          Don't have an account?{' '}
          <Text style={styles.signUpButton} onPress={handleSignUp}>
            Sign Up
          </Text>
        </Text>
      </View>
   
    );
  };


export default LoginScreen;
  