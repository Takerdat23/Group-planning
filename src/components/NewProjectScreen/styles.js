import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity , Alert} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 20,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginLeft: 10,
    },
    ProjectNameinput: {
      borderWidth: 1,
      borderColor: '#ddd',
      padding: 10,
      fontSize: 16,
      borderRadius: 6,
      backgroundColor: '#fff',
      marginBottom: 10,
      height:'15%', 
      textAlign: 'left',
      textAlignVertical: 'top', 
    },
    Descriptioninput: {
      borderWidth: 1,
      borderColor: '#ddd',
      padding: 10,
      fontSize: 16,
      borderRadius: 6,
      backgroundColor: '#fff',
      marginBottom: 10,
      height:'30%', 
      textAlign: 'left',
      textAlignVertical: 'top', 
    },
    inputDescription: {
      fontSize: 12,
      color: 'gray',
      marginBottom: 20,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    button: {
      paddingVertical: 15,
      paddingHorizontal: 20,
      borderRadius: 10,
      width: '40%',
    },
    cancelButton: {
      backgroundColor: '#ddd',
    },
    createButton: {
      backgroundColor: 'dodgerblue',
    },
    buttonText: {
      textAlign: 'center',
      color: '#fff',
      fontWeight: 'bold',
    },
  });

export default styles; 