import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles.js'
import {useProjectsCount} from "../../server/context.js"; 
//import { useUser } from '../../server/context.js';

const getRelativeTime = (date) => {
  const now = new Date();
  const seconds = Math.round((now - date) / 1000);
  const minutes = Math.round(seconds / 60);
  const hours = Math.round(minutes / 60);
  const days = Math.round(hours / 24);

  if (seconds < 60) return `${seconds} seconds ago`;
  else if (minutes < 60) return `${minutes} minutes ago`;
  else if (hours < 24) return `${hours} hours ago`;
  else return `${days} days ago`;
};

const PersonalProject = ({ navigation }) => {
  const [projects, setProjects] = useState([]);
  const {projectData,  updateCount} = useProjectsCount(); 
  //const {user} = useUser();
  

  useEffect(() => {
      loadProjects();
  }, []);

  useEffect(() => {
    storeProjects(projects);
   
    projectData.Personal_Projects = projects.length ; 
    updateCount(projectData);
  }, [projects]);



  const storeProjects = async (projects) => {
    try {
      const tasksString = JSON.stringify(projects);
      await AsyncStorage.setItem('Projects', tasksString);
    } catch (e) {
      console.error("Error saving tasks", e);
    }
  };
  

  const loadProjects = async () => {
    try {
        const projectsString = await AsyncStorage.getItem('Projects');
        if (projectsString !== null) {
          setProjects(JSON.parse(projectsString));
        }
    } catch (e) {
      console.error("Error loading tasks", e);
    }
  };


  const handleNewProjects = (newProject) => {
    setProjects([...projects, newProject]);
    
  };

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const handleUpdateProjects = (id, newProjectcompletion) => {
   
    const updatedproject = projects.map(project => {
      if (project.id === id) {
        return { ...project, completionStatus: newProjectcompletion };
      }
      return project;
    });
    setProjects(updatedproject);
  };



  const handleNewProject = () => {
    navigation.navigate('NewProject', {
      onProjectSubmit: handleNewProjects,
    });
   
  };

  const handleDeleteProject = (Project_to_delete_id) => {
    const updated_projects = projects.filter(project => project.id !== Project_to_delete_id ); 
    setProjects(updated_projects); 
    navigation.goBack(); 
 };


  const handleProject = (project) => {
    navigation.navigate("todolist", {
      Current_project: project , 
      Project_id: project.id, 
      onNewTaskCompletion: handleUpdateProjects,
      onDeleteCall: handleDeleteProject, 
    }); 
   
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.projectCount}>You have {projects.length} projects</Text>
        {projects.map((project, index) => (
        <TouchableOpacity 
          key={project.id} 
          style={styles.projectCard} 
          
          onPress={() => handleProject(project)}
        >
          <View style={[styles.projectIcon, { backgroundColor: getRandomColor() }]} />
          <View style={styles.projectDetails}>
            <Text style={styles.projectTitle}>{project.title}</Text>
            <Text style={styles.projectTimestamp}>{getRelativeTime(new Date(project.createdAt))}</Text>
            <Text style={styles.projectCompletion}>{project.completionStatus}</Text>
          </View>
        </TouchableOpacity>
      ))}
        <TouchableOpacity style={styles.newProjectButton} onPress={handleNewProject}>
          <Text style={styles.newProjectButtonText}>+ New Project</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};


export default PersonalProject;