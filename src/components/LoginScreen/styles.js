
import {  StyleSheet } from 'react-native';

const  styles = StyleSheet.create({
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
    errorText: {
      color: 'red',
      marginBottom: 10,
    },
    signUpText: {
      marginTop: 10,
    },
    signUpButton: {
      color: 'blue',
      fontWeight: 'bold',
    },
  });

export default styles; 
  