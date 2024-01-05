import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity , Alert} from 'react-native';
import { Ionicons } from '@expo/vector-icons';



const NewProjectScreen = ({route, navigation}) => {
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const { onProjectSubmit } = route.params;

  

  const generateKeyWithTimestamp = () => {
    return new Date().getTime().toString();
  };

  const handleCreate = () => {
    if (projectName.length){

  
  
    const newProject = { 
      id: generateKeyWithTimestamp() ,
      title: projectName, 
      createdAt: new Date(),
      completionStatus: '',
      description: projectDescription, 
      Tasks: [], 
      collaborators: [],
    }
    console.log('Project Created:',newProject);
    onProjectSubmit(newProject); 
    navigation.goBack(); 
   }
    else{

      Alert.alert(
        "Oops", 
        "Project name cannot be empty", 
          [
          {
            text: "OK",
            onPress: () => console.log("OK Pressed"),
            style: "cancel"
          }
          ]
        );
      }
  
  };

  const handleCancel = () => {
    navigation.goBack(); 
    console.log('Creation Cancelled');
  };

  return (
    <View style={styles.container}>
     
      <TextInput
        style={styles.ProjectNameinput}
        placeholder="Enter project title"
        value={projectName}
        onChangeText={setProjectName}
      />
    
      <TextInput
        style={styles.Descriptioninput}
        placeholder="Descriptions"
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

export default NewProjectScreen;
