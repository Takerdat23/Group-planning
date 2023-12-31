import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    // Handle the sign-up logic
  };

  const handleSignIn = () => {
    navigation.navigate('ProfileScreen'); // Adjust with your actual sign-in screen name
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff', // Assuming a white background
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 18,
    marginTop: 10,
  },
  input: {
    width: '100%',
    marginVertical: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
  },
  hintText: {
    alignSelf: 'flex-start',
    fontSize: 10,
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 20,
  },
  buttonOutline: {
    borderWidth: 1,
    borderColor: '#01a2cb',
    borderRadius: 15,
    padding: 15,
    marginRight: 10,
  },
  buttonOutlineText: {
    color: '#01a2cb',
  },
  button: {
    backgroundColor: '#01a2cb',
    borderRadius: 15,
    padding: 15,
    flexGrow: 1,
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
  },
  signInText: {
    marginTop: 20,
    marginBottom: 20,
  },
  signInButton: {
    backgroundColor: '#007bff', // Example color for the "Sign In" button
    borderRadius: 15,
    padding: 15,
    marginTop: 10, // Space above the button, adjust as needed
    width: '100%', // Use the full width available
  },
  signInButtonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold', // If you want the text to be bold
  },
});

export default LoginScreen;
