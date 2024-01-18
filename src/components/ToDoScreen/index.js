import React, { useState, useEffect, useContext } from 'react';
import {  View, Text, TouchableOpacity, FlatList, Modal, TextInput, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons'; 
import {getStatusStyle, getRelativeTime} from './utils.js'
import styles from './styles.js'

  const TaskScreen = ({route, navigation}) => {
    const [tasks, setTasks] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState('');
    const [editingTaskKey, setEditingTaskKey] = useState(null);
    const [newTaskModalVisible, setNewTaskModalVisible] = useState(false);
    const [settingModalVisible, setSettingModalVisible] = useState(false);
    const [newTaskText, setNewTaskText] = useState('');
    const {onNewTaskCompletion }= route.params; 
    const {Project_id} = route.params; 
    const {Current_project} = route.params ; 
    const {onDeleteCall} = route.params; 
  
    useEffect(() => {
     
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity onPress={handleSettingsPress}>
            <Ionicons
              name="md-settings"
              size={24}
              color="black" 
              style={{ marginRight: 10 }} // Provide some spacing
            />
          </TouchableOpacity>
        ),
  
      });
    }, [navigation]);
  
  
    const handleSettingsPress = () => {
      setSettingModalVisible(true); 
    };
  
  

  
    useEffect(() => {
      loadTasks();
    }, []);
  
    useEffect(() => {
      storeTasks(tasks);
    }, [tasks]);
  
    const sortTasksByStatus = (tasks) => {
      const statusOrder = { 'To do': 1, 'Pending': 2, 'Done': 3 };
  
      return tasks.sort((a, b) => {
        return statusOrder[a.status] - statusOrder[b.status];
      });
    };
  
    
    function getRandomColor() {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };


    const handleDeleteProject = () => {
      Alert.alert(
        "Delete Project",
        "Are you sure you want to delete this project?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          {
            text: "OK",
            onPress: () => {
              console.log("OK Pressed, delete the project");
              onDeleteCall(Current_project.id);
            }
          }
        ],
        { cancelable: false }
      );
    };

    const setProjectChanges = () => {
      
      const tasksCompletion=  getCompletionStatus(); 
      
      onNewTaskCompletion(Project_id, tasksCompletion)
    }
    const handleRemoveTask =  (id) => {
      console.log("removed"); 
      const newtasks = tasks.filter((item) => item.key !== id);
      setTasks(newtasks);
      setProjectChanges();
    };
  
  
    const storeTasks = async (tasks) => {
      try {
        const tasksString = JSON.stringify(tasks);
        const name = Project_id + 'tasks'; 
        await AsyncStorage.setItem(name, tasksString);
      } catch (e) {
        console.error("Error saving tasks", e);
      }
    };
    
  
    const loadTasks = async () => {
      try {
        const name = Project_id + 'tasks'; 
        const tasksString = await AsyncStorage.getItem(name);
        if (tasksString !== null) {
          setTasks(JSON.parse(tasksString));
        }
      } catch (e) {
        console.error("Error loading tasks", e);
      }
    };
  
    const addNewTask = () => {
      if(newTaskText.length){
        const newTask = {
        key: '',
        text: newTaskText,
        status: 'To do' 
      };
      setTasks([...tasks, newTask]);
      storeTasks([...tasks, newTask]); 
      setNewTaskText('');
     
      
      }
      else{
        Alert.alert(
          "No Tasks", 
          "The task list is empty.", 
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
    
  
    const changeTaskStatus = (key, newStatus) => {
      const updatedTasks = tasks.map(task => {
        if (task.key === key) {
          return { ...task, status: newStatus };
        }
        return task;
      });
      setTasks(updatedTasks);
   
      setModalVisible(false);
    };
  
    const openModal = (task) => {
      setEditingTaskKey(task.key);
      setSelectedStatus(task.status);
      setModalVisible(true);
    };
  
    const getCompletionStatus= ()=> { 
      const DoneTasks = tasks.filter(item => item.status === 'Done');
      const DoneTasksCount = DoneTasks.length;
      console.log(DoneTasksCount); 
  
      return  DoneTasksCount.toString()+ "/" + tasks.length.toString()+  " completed";
    }; 
  
    const DoneTasks = tasks.filter(item => item.status === 'Done');
    const DoneTasksCount = DoneTasks.length;
  
    
  
    const sortedTasks = sortTasksByStatus(tasks);
    setProjectChanges();
  
    return (
      
      <View style={styles.container}>
       
        <View style={styles.titleContainer}>
          <View style={[styles.initialBox, styles.boxF]}>
            <Text style={styles.initialLetter}>F</Text>
          </View>
         
          <Text style={styles.title}>{Current_project.title}</Text>
          <Text style={styles.timeStamp}>{getRelativeTime(new Date(Current_project.createdAt))}</Text>
          <Text style={styles.description}>{Current_project.description}</Text>
        </View>
        <View style={styles.taskHeader}>
          <Text style={styles.taskCount}>You have {tasks.length} tasks</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setNewTaskModalVisible(true)}
          >
            <Text style={styles.addButtonText}>+ Add</Text>
          </TouchableOpacity>
  
        </View>
  {/*modal for change task status */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPressOut={() => setModalVisible(false)}
          >
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={[styles.option , getStatusStyle('Done')]}
                onPress={() => changeTaskStatus(editingTaskKey, 'Done')}
              >
                <Text style={styles.optionText}>Done</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.option , getStatusStyle('To do')]}
                onPress={() => changeTaskStatus(editingTaskKey ,'To do')}
              >
                <Text style={styles.optionText}>To do</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.option , getStatusStyle('Pending')]}
                onPress={() => changeTaskStatus(editingTaskKey ,'Pending')}
              >
                <Text style={styles.optionText}>Pending</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
  {/*modal for add tasks */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={newTaskModalVisible}
          onRequestClose={() => setNewTaskModalVisible(false)}
        >
        <TouchableOpacity
            style={styles.centeredView}
            activeOpacity={1}
            onPressOut={() => setNewTaskModalVisible(false)}
          >
          
         
            <View style={styles.AddtaskView}>
              <TextInput
                style={styles.addtaskTextInput}
                placeholder="Enter your task here..."
                value={newTaskText}
                onChangeText={setNewTaskText}
              />
              <TouchableOpacity
                style={styles.addTaskbutton}
                onPress={() => {
                  addNewTask();
                  setNewTaskModalVisible(false);
                }}
              >
              <Text style={styles.textStyle}>Add Task</Text>
            </TouchableOpacity>
          </View>
       
        </TouchableOpacity>
      </Modal>
  
  {/*modal for settings button */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={settingModalVisible}
          onRequestClose={() => setSettingModalVisible(false)}
        >
        
        <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPressOut={() => setSettingModalVisible(false)}
          >
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={styles.deleteOption }
                onPress={() => handleDeleteProject()}
              >
                <Text style={styles.optionText}>Delete project</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
      </Modal>
  
  
  
        <FlatList
          data={sortedTasks}
          renderItem={({ item }) => (
            <View style={styles.taskItem}>
              <Text style={styles.taskText}>{item.text}</Text>
  
              <TouchableOpacity onPress={() => openModal(item)}>
                <Text style={[styles.taskStatus, getStatusStyle(item.status)]}>
                  {item.status}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleRemoveTask(item.key)}>
                <FontAwesome name="trash-o" size={24} color="red" style={styles.trashIcon} />
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.key}
        />
        <View style={styles.footer}>
          <Text style={styles.completionText}>{DoneTasksCount}/{tasks.length} completed</Text>
        </View>
      </View>
    );
  };

export default  TaskScreen ; 