import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from './styles.js'
import * as server from '../../server/AuthService.js';



const SignUpScreen = ({ navigation }) => {
  
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  

  const handleSignUp =  () => {
    server.connectSocket(); 
    console.log(userName, email,password); 
    server.signup(userName, email ,password); 
  };

  const handleSignIn = () => {
    navigation.navigate('ProfileScreen'); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <Text style={styles.label}>User Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Dilane321"
        value={userName}
        onChangeText={setUserName}
      />
      <Text style={styles.hintText}>Provide at least 2 characters</Text>

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="abc@gmail.com"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="abc1234567"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Text style={styles.hintText}>Provide at least 6 characters</Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.buttonOutline} onPress={() => {}}>
          <Text style={styles.buttonOutlineText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.signInText}>Already have an account?</Text>
      <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
        <Text style={styles.signInButtonText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpScreen;