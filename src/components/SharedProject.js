import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';


const projectData = [
  {
    id: '1',
    title: 'Preparation for the exam',
    timestamp: '12min ago',
    completionStatus: '1/4 completed',
    collaborators: ['D', 'A', 'F', '+1'],
  },

];

const SharedProjectsScreen = ({navigation}) => {
  
  const [projects, setProjects] = useState(projectData);

  const handleproject = () => { 
    navigation.navigate('sharedTasks')
  }

  const renderProject = ({ item }) => (
    <TouchableOpacity style={styles.projectCard} onPress={handleproject}>
      <View style={[styles.projectIcon, styles.blueBox]} />
      <View style={styles.projectDetails}>
        <Text style={styles.projectTitle}>{item.title}</Text>
        <View style={styles.collaborators}>
          {item.collaborators.map((initial, index) => (
            <Text key={index} style={styles.collaboratorInitial}>
              {initial}
            </Text>
          ))}
        </View>
        <Text style={styles.projectTimestamp}>{item.timestamp}</Text>
        <Text style={styles.projectCompletion}>{item.completionStatus}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Ionicons name="menu" size={24} color="black" />
        <Ionicons name="search" size={24} color="black" />
        <MaterialCommunityIcons name="bell-outline" size={24} color="black" />
      </View>
      <FlatList
        data={projects}
        renderItem={renderProject}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <>
            <Text style={styles.title}>Shared Projects</Text>
            <Text style={styles.projectCount}>You have {projects.length} shared project(s)</Text>
          </>
        }
        ListFooterComponent={
          <TouchableOpacity style={styles.newProjectButton}>
            <Text style={styles.newProjectButtonText}>+ New Project</Text>
          </TouchableOpacity>
        }
      />
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
    backgroundColor: 'blue',
    marginRight: 10,
  },
  projectDetails: {
    justifyContent: 'center',
  },
  collaborators: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  collaboratorInitial: {
    marginRight: 5,
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
    fontWeight: 'bold',
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#e1e1e1',
  },
  blueBox: {
    // additional styles if necessary
  },
});

export default SharedProjectsScreen;
