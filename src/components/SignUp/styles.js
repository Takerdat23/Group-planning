import React, { useState } from 'react';
import { StyleSheet , TouchableOpacityBase} from 'react-native';

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

export default styles; 