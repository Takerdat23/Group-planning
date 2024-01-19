import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from './styles.js'
import { signup } from '../../server/AuthService.js';


const SignUpScreen = ({ navigation }) => {
  
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
 
  function handleSignUp() {
    setLoading(true);
    setError('');
  
    const signupPromise = signup(userName, email, password)
    signupPromise.then(
      () => {
        setLoading(false);
        navigation.navigate('Login');
      }, 
      (error) => {
        setLoading(false);
        setError(error); 
      })
  };


  const handleCancle =() => { 
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <Text style={styles.label}>User Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Dilane321"
        autoCapitalize='none'
        value={userName}
        onChangeText={setUserName}
      />
      <Text style={styles.hintText}>Provide at least 2 characters</Text>

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="abc@gmail.com"
        autoCapitalize='none'
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="abc1234567"
        autoCapitalize='none'
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Text style={styles.hintText}>Provide at least 6 characters</Text>

      <View style={styles.buttonRow}>
        
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        
      </View>

      <TouchableOpacity style={styles.buttonOutline} onPress={handleCancle}>
          <Text style={styles.buttonOutlineText}>Cancel</Text>
        </TouchableOpacity>
      {loading && <ActivityIndicator size="large" color="#F82727" />}
      <Text style={styles.errorText}>{error}</Text>

      <Text style={styles.signInText}>Already have an account?</Text>
     
    </View>
  );
};

export default SignUpScreen;