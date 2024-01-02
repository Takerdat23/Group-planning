import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const NewProjectScreen = () => {
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');

  // Functions to handle creating and canceling will go here
  const handleCreate = () => {
    // Logic to create a new project
    console.log('Project Created:', projectName, projectDescription);
  };

  const handleCancel = () => {
    // Logic to cancel creation
    console.log('Creation Cancelled');
  };

  return (
    <View style={styles.container}>
     
      <TextInput
        style={styles.input}
        placeholder="Preparation for the exam"
        value={projectName}
        onChangeText={setProjectName}
      />
      <Text style={styles.inputDescription}>
        Provide at least 4 characters and a maximum of 40
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Prepare myself for the final exam."
        value={projectDescription}
        onChangeText={setProjectDescription}
        multiline
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleCancel} style={[styles.button, styles.cancelButton]}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCreate} style={[styles.button, styles.createButton]}>
          <Text style={styles.buttonText}>Create</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 16,
    borderRadius: 6,
    backgroundColor: '#fff',
    marginBottom: 10,
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

export default NewProjectScreen;
