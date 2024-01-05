import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Modal, TextInput, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';



const tasksData = [
  { key: '1', text: 'Buy clothes', status: 'To do' },
  { key: '2', text: 'Buy ingredients for cakes', status: 'Pending' },
  { key: '3', text: 'Buy fruit', status: 'Done' },

];



const getStatusStyle = (status) => {
  switch (status) {
    case 'To do':
      return { backgroundColor: '#F6FE72' };
    case 'Done':
      return { backgroundColor: '#86D557' };
    case 'Pending':
      return { backgroundColor: '#5FCEE9' };
    default:
      return { backgroundColor: '#ddd' }; 
  }
};

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

const TaskScreen = () => {
  const [tasks, setTasks] = useState(tasksData);
  const [taskText, setTasktext ] = useState('');
  const [key, setTaskKey] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [editingTaskKey, setEditingTaskKey] = useState(null);
  const [newTaskModalVisible, setNewTaskModalVisible] = useState(false);
  const [newTaskText, setNewTaskText] = useState('');

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

  const handleRemoveTask =  (id) => {
    console.log("removed"); 
    const newtasks = tasks.filter((item) => item.key !== id);
    setTasks(newtasks);
  }


  const storeTasks = async (tasks) => {
    try {
      const tasksString = JSON.stringify(tasks);
      await AsyncStorage.setItem('tasks', tasksString);
    } catch (e) {
      console.error("Error saving tasks", e);
    }
  };
  

  const loadTasks = async () => {
    try {
      const tasksString = await AsyncStorage.getItem('tasks');
      if (tasksString !== null) {
        setTasks(JSON.parse(tasksString));
      }
    } catch (e) {
      console.error("Error loading tasks", e);
    }
  };

  const addNewTask = () => {
    if(newTaskText.length){
      const newKey = (tasks.length + 1).toString(); 
      const newTask = {
      key: newKey,
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

  const DoneTasks = tasks.filter(item => item.status === 'Done');
  const DoneTasksCount = DoneTasks.length;

  const sortedTasks = sortTasksByStatus(tasks);

  return (
    
    <View style={styles.container}>
     
      <View style={styles.titleContainer}>
        <View style={[styles.initialBox, styles.boxF]}>
          <Text style={styles.initialLetter}>F</Text>
        </View>
        <Text style={styles.title}>Go to the market</Text>
        <Text style={styles.timeStamp}>5min ago</Text>
        <Text style={styles.description}>Prepare things to organize a weeding {'<3'}</Text>
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
      <Modal
        animationType="fade"
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
              style={styles.option}
              onPress={() => changeTaskStatus(editingTaskKey, 'Done')}
            >
              <Text style={styles.optionText}>Done</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option}
              onPress={() => changeTaskStatus(editingTaskKey ,'To do')}
            >
              <Text style={styles.optionText}>To do</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option}
              onPress={() => changeTaskStatus(editingTaskKey ,'Pending')}
            >
              <Text style={styles.optionText}>Pending</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>


      <Modal
        animationType="slide"
        transparent={true}
        visible={newTaskModalVisible}
        onRequestClose={() => setNewTaskModalVisible(false)}
      >
        <View style={styles.centeredView}>
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
      </View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  topNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
  },
  backIcon: {
    marginRight: 10,
  },
  initialsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  initialsText: {
    color: 'black',
  },
  titleContainer: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    margin: 15,
  },
  initialBox: {
    width: 50,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  boxF: {
    backgroundColor: 'blue',
  },
  initialLetter: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  timeStamp: {
    fontSize: 12,
    color: 'gray',
  },
  description: {
    fontSize: 16,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  taskCount: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  noTasksText: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20, // Adjust the margin as needed
  },
  addButton: {
    backgroundColor: 'dodgerblue',
    borderRadius: 5,
    padding: 10,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  taskText: {
    fontSize: 16,
    flex: 1, 
    marginRight: 10, 
  },
  taskStatus: {
    backgroundColor: '#ddd',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    color: 'black',
    fontSize: 14,
    minWidth: 80,
    textAlign: 'center', // Center the text inside the status
  },
  trashIcon: {
    padding: 5,
  },
  footer: {
    padding: 15,
  },
  completionText: {
    textAlign: 'center',
    fontSize: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "#2196F3"
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 20,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  option: {
    backgroundColor: '#F0F0F0',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  optionText: {
    textAlign: 'center',
    fontSize: 16,
  },

  AddtaskView: {
    width: '90%', 
    height: '40%', 
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  addTaskbutton: {
    width: '100%',
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    backgroundColor: "#2196F3"
  },
  addtaskTextInput: {
    width: '100%',
    height: '70%', 
    padding: 10,
    textAlign: 'left',
    textAlignVertical: 'top', 
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5
  }
});

export default TaskScreen;
