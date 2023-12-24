import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
  
    navigation.navigate('HelloWorld');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
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
   
    <Button style={styles.buttonContainer} 
            title="Login" 
            onPress={handleLogin} 
            color="#007bff" 
      />
    
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      width: '100%', 
      alignSelf: 'center', 
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
    buttonContainer: {
        marginTop:210,
        width: '80%', 
        borderRadius: 5,
        overflow: 'hidden', 
      },
  });

export default LoginScreen;
