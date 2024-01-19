import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image, Modal, TextInput , Button} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import {MemberIndicator, saveMembersToStorage, getMemberByNameFromStorage, getRandomColor } from './utils';
import {useMembers} from '../../server/context'; 
import styles from './styles'
import { useProjectsCount } from "../../server/context.js"; 
import { addProject, addNewMember, getProjects } from '../../server/AuthService.js';
import { useUser } from '../../server/context';
import { useShared } from '../../server/context';
import socket, { uEmail } from '../../server/socket.js';
import { ttuser } from '../../server/socket.js';
import { effect, signal } from '@preact/signals-react';


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

const SharedProjectsScreen = ({ navigation }) => {
  const { user, setUser, userData, setUserData} = useUser()
  const [projects, setProjects] = useState([])
  const [modalVisible, setModalVisible] = useState(false);
  const [newMemberName, setNewMemberName] = useState('');
  const [members, setMembers] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const {Memberlist, setMemberlist} = useMembers();
  const {projectData,  updateCount} = useProjectsCount();

  useEffect(() => {
    setProjects(ttuser.value)
  }, [])
  
  effect(() => {
    projectData.Shared_Projects = projects.length
    updateCount(projectData)
  }, [projects])

  const openAddMemberModal = (project) => {
    setSelectedProject(project)
    setModalVisible(true)
  };

  const handleAddMember = () => {
    if (selectedProject && newMemberName) {
      addMember(selectedProject, newMemberName);
      setNewMemberName('');
      setModalVisible(false);
    }
  };

  const addMember = async (project, newMemberName) => {
    addNewMember(project.id, userData.email, newMemberName)
  };


  
  const handleUpdateProjects = (id, updatedProject) => {
    setProjects(projects => { 
      return projects.map(proj => {
        
        if (proj.id === id) {
          return updatedProject;
        }
        
        return proj;
      });
    });
  };

  const handleNewProject = () => {
    navigation.navigate('NewProject', {
      onProjectSubmit: (newProject) => {
        const addPromise = addProject(newProject)
        addPromise.then((data) => {
          ttuser.value = [...ttuser.value, data]
          setProjects(ttuser.value)
        }, (message) => {
          console.log(message)
        })
      },
    });
  };

  const handleDeleteProject = (Project_to_delete_id) => {
     const updated_projects = projects.filter(project => project.id !== Project_to_delete_id ); 
     setProjects(updated_projects); 
     navigation.goBack(); 
  };

  const handleProject = (project) => {
    navigation.navigate("sharedTasks", {
      Current_project: project , 
      Project_id: project.id, 
      onNewTaskCompletion: handleUpdateProjects,
      onDeleteCall : handleDeleteProject, 
    }); 
   
  };

  const checkMaster = (project) => {
    return user == project.master
  }

  const GetMemberPerProject = (project) => { 
    const memberList = []; 
    for(x in project.members){

      const member = members.find(m => m.name === project.members[x]);
  
      memberList.push(member); 
    }
    return memberList;
  };

  return (
    <View style={styles.container}>
      

      <ScrollView style={styles.scrollView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
  
      >
        <TouchableOpacity
            style={styles.centeredView}
            activeOpacity={1}
            onPressOut={() => setModalVisible(!modalVisible)}
          >
     
          <View style={styles.modalView}>
            <TextInput
              placeholder="Enter new member's name"
              value={newMemberName}
              onChangeText={setNewMemberName}
              style={styles.modalTextInput}
            />
            <Button
              title="Add Member"
              onPress={handleAddMember}
            />
          </View>
   
        </TouchableOpacity>
      </Modal>
        <Text style={styles.projectCount}>You have {projects.length} projects</Text>
        {projects.map((project, index) => (
        <TouchableOpacity 
          key={project.id} 
          style={styles.projectCard} 
          
          onPress={() => handleProject(project)}
        >
          {/* Plus button to add member */}
       
          <View style={[styles.projectIcon, { backgroundColor: project.color }]} />
          <View style={styles.projectDetails}>
            <Text style={styles.projectTitle}>{project.title}</Text>
            <Text style={styles.projectTimestamp}>{getRelativeTime(new Date(project.createdAt))}</Text>
            <Text style={styles.projectCompletion}>{project.completionStatus}</Text>
            {/* Plus button to add member */}
          </View>
           {/* Add this line where you want the member indicators to appear */}
          <MemberIndicator members={GetMemberPerProject(project)} />
          {checkMaster(project) && <TouchableOpacity
              style={styles.addMemberButton}
              onPress={() => openAddMemberModal(project)}
            >
              <Ionicons name="person-add-outline" size={28} ></Ionicons>
            </TouchableOpacity>}

          

        </TouchableOpacity>
        
      

      ))}
        <TouchableOpacity style={styles.newProjectButton} onPress={handleNewProject}>
          <Text style={styles.newProjectButtonText}>+ New Project</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};



export default SharedProjectsScreen; 
