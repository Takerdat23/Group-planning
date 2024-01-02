import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

const PersonalProject = ({navigation}) => {
  const handleNewProject =() => {
    navigation.navigate("NewProject"); 
  };

  const handleProject =() => {
    navigation.navigate("todolist");
  };
  return (
    <View style={styles.container}>
      
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>Personal Projects</Text>
        <Text style={styles.projectCount}>You have 2 projects</Text>
        <TouchableOpacity style={styles.projectCard} onPress={handleProject}>
          <View style={[styles.projectIcon, { backgroundColor: 'blue' }]} />
          <View style={styles.projectDetails}>
            <Text style={styles.projectTitle}>Preparation for the exam</Text>
            <Text style={styles.projectTimestamp}>12min ago</Text>
            <Text style={styles.projectCompletion}>1/4 completed</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.projectCard} onPress={handleProject} >
          <View style={[styles.projectIcon, { backgroundColor: 'green' }]} />
          <View style={styles.projectDetails}>
            <Text style={styles.projectTitle}>Preparation for the exam</Text>
            <Text style={styles.projectTimestamp}>12min ago</Text>
            <Text style={styles.projectCompletion}>1/4 completed</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.newProjectButton} onPress={handleNewProject}>
          <Text style={styles.newProjectButtonText}>+ New Project</Text>
          
        </TouchableOpacity>
      </ScrollView>
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  scrollView: {
    margin: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  projectCount: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 15,
  },
  projectCard: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  projectIcon: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 10,
  },
  projectDetails: {
    justifyContent: 'center',
  },
  projectTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  projectTimestamp: {
    fontSize: 14,
    color: 'gray',
  },
  projectCompletion: {
    fontSize: 14,
    color: 'gray',
  },
  newProjectButton: {
    backgroundColor: 'dodgerblue',
    borderRadius: 5,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  newProjectButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#e1e1e1',
  },
});

export default PersonalProject;
