import React, { useState, useEffect, useContext } from 'react';
import {  View, Text, TouchableOpacity, FlatList, Modal, TextInput, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons'; 
import {getStatusStyle, getRelativeTime} from './utils.js'
import {useUser, useMembers } from '../../server/context.js'
import styles from './styles.js'
import { addTask, getTask, updateTask, deleteTask } from '../../server/AuthService.js';
import { useIsFocused } from '@react-navigation/native';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry.js';
import DateTimePicker from '@react-native-community/datetimepicker';


  const SharedTaskScreen = ({route, navigation}) => {
    const [tasks, setTasks] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState('');
    const [editingTaskKey, setEditingTaskKey] = useState(null);
    const [newTaskModalVisible, setNewTaskModalVisible] = useState(false);
    const [settingModalVisible, setSettingModalVisible] = useState(false);
    const [editMemberVisible, setEditMemberVisible] = useState(false);
    const [newTaskText, setNewTaskText] = useState('');
    const {Current_project, Project_id, onNewTaskCompletion, onDeleteCall} = route.params ; 
    const [project , setProject] = useState(Current_project); 
    const {user , setUser} = useUser(); 
    const {Memberlist, setMemberlist} = useMembers();


    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShowDatePicker(Platform.OS === 'ios');
      setDate(currentDate);
    };

   

    useEffect(() => {
      const gPro =  getTask(project.id)
      gPro.then((ts) => {
        setTasks(ts)
        console.log(ts)
      }, (error) => {
        console.log(error)
      })
    }, [project])
    const changeSettings = () => { 
     
      if (Current_project.master == user){ 
        return true; 
      
      }
      return false; 
    }
  
    useEffect(() => {

      
     
      navigation.setOptions({
        headerRight: () => ((changeSettings() && (
          <View>
          <TouchableOpacity onPress={handleSettingsPress}>
            <Ionicons
              name="md-settings"
              size={24}
              color="black" 
              style={{ marginRight: 10 }} // Provide some spacing
            />
          </TouchableOpacity>

      
          </View>
          ))
        ),
   
  
      });
    }, [navigation]);

    useEffect(()=> { 
    
      if (Current_project.master == user){ 
        setEditMemberVisible(true); 
      
      }
      else { 
        setEditMemberVisible(false); 
      }
    });
  
  
    const handleSettingsPress = () => {
      setSettingModalVisible(true); 
    };

  
    const generateKeyWithTimestamp = () => {
      return new Date().getTime().toString();
    };
  
    const sortTasksByStatus = (tasks) => {
      const statusOrder = { 'To do': 1, 'Pending': 2, 'Done': 3 };
  
      return tasks.sort((a, b) => {
        return statusOrder[a.status] - statusOrder[b.status];
      });
    };
//Send completion status to shareproject screen 
    const setProjectChanges = () => {
      
      const tasksCompletion=  getCompletionStatus(); 
      Current_project.completionStatus = tasksCompletion; 
      
      onNewTaskCompletion(Project_id, Current_project);
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


    // Member editing section 



    //Send delete members to shareproject screen 
    const handleDeleteMember = (userName) =>{

     const updatedMembers = Current_project.members.filter(member => member !== userName);
     Current_project.members = updatedMembers
     onNewTaskCompletion(Project_id, Current_project);
    };

    


    const handleEditmember =() => { 
      const currentProj_member_list = Current_project.members; 
      const ProjectMembers_Instances =  Memberlist.filter(member => currentProj_member_list.includes(member.name)); 
      // navigate to member list 
      navigation.navigate("member list", {
      member_list: ProjectMembers_Instances, 
      onMemberChange: handleDeleteMember
      }); 
    };


    // Edit task section
  
  
    // const storeTasks = async (tasks) => {
    //   try {
    //     const tasksString = JSON.stringify(tasks);
    //     const name = Project_id + 'tasks'; 
    //     await AsyncStorage.setItem(name, tasksString);
    //   } catch (e) {
    //     console.error("Error saving tasks", e);
    //   }
    // };
    
  
    // const loadTasks = async () => {
    //   try {
    //     const name = Project_id + 'tasks'; 
    //     const tasksString = await AsyncStorage.getItem(name);
    //     if (tasksString !== null) {
    //       setTasks(JSON.parse(tasksString));
    //     }
    //   } catch (e) {
    //     console.error("Error loading tasks", e);
    //   }
    // };
  
    const addNewTask = () => {
      if(newTaskText.length){
        const newKey = generateKeyWithTimestamp(); 
        const newTask = {
        key: newKey,
        text: newTaskText,
        status: 'To do' , 
        endDate: date, 
        asigned_to : '', 
      };

   
      const ap = addTask(newTask, project.id)
      ap.then((message) => {
        const gPro = getTask(project.id)
        gPro.then((ts) => {
          setTasks(ts)
          console.log(ts)
        }, (error) => {
          console.log(error)
        })
      }, (message) => {
        console.log(message)
      })

      
      setNewTaskText('')
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

    const handleRemoveTask =  (id) => {
      deleteTask(id);
      console.log("removed"); 
      // const newtasks = tasks.filter((item) => item.key !== id);
      // setTasks(newtasks);
      getTask().then((data) => {
        setTasks(data);
      });
      setProjectChanges();
    }; 


    const handleAssignmentPress = (task) => {
      console.log(Memberlist); 
    
      setAssignModalVisible(true);
    };

    const handleAssignPress= (member) => { 
      setAssignModalVisible(false);
    };


    
  //Update task status section 
  const changeTaskStatus = (key, newStatus) => {
    console.log(tasks);
  
    const updatedTasks = tasks.map(task => {
      if (task.id === key) {
        
        const updatedTask = { ...task, status: newStatus }; 
        updateTask(key, updatedTask); 
        return updatedTask; 
      }
      return task; 
    });
  
    console.log(updatedTasks);
    setTasks(updatedTasks); // Assuming setTasks is a function that updates the state
  
    setModalVisible(false); // Assuming this is a function to handle UI changes
  };
  
    const openModal = (task) => {
      setEditingTaskKey(task.id);
      setSelectedStatus(task.status);
      setModalVisible(true);
    };
  
    const getCompletionStatus= ()=> { 
      const DoneTasks = tasks.filter(item => item.status === 'Done');
      const DoneTasksCount = DoneTasks.length;
     
  
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

            {showDatePicker && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode="date"
                is24Hour={false}
                display="default"
                onChange={onChange}
              />
            )}

            <TouchableOpacity
              style={styles.addTaskbutton}
              onPress={() => {
                addNewTask();
                setNewTaskModalVisible(false);
              }}
            >
              <Text style={styles.textStyle}>Add Task</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.addTaskbutton}
              onPress={() => setShowDatePicker(!showDatePicker)}
            >
              <Text style={styles.textStyle}>Pick Date</Text>
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

              {editMemberVisible && (
                  <TouchableOpacity
                    style={styles.editmemberOption}
                    onPress={() => handleEditmember()}
                  >
                  <Text style={styles.optionText}>Edit members</Text>
                  </TouchableOpacity>)}

            </View>
          </TouchableOpacity>
      </Modal>
  
      {/*modal for assign button */}
    
     
  
              
      {/*List of tasks */}


      <FlatList
        data={sortedTasks}
        renderItem={({ item }) => (
          <View style={styles.taskCard}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Text style={styles.taskText}>{item.description}</Text>
              <Text style={styles.assignedMemberText}>{item.description}</Text>

            
            </View>
            <TouchableOpacity onPress={() => openModal(item)}>
              <Text style={[styles.taskStatus, getStatusStyle(item.status)]}>
                {item.status}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleRemoveTask(item.id)}>
              <FontAwesome name="trash-o" size={24} color="red" style={styles.trashIcon} />
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id}
        />
        <View style={styles.footer}>
          <Text style={styles.completionText}>{DoneTasksCount}/{tasks.length} completed</Text>
        </View>
      </View>
    );
  };

export default  SharedTaskScreen ; 