import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { AntDesign, FontAwesome, MaterialIcons } from '@expo/vector-icons';

const tasksData = [
  { key: '1', text: 'Buy clothes', status: 'To do' },
  { key: '2', text: 'Buy ingredients for cakes', status: 'Pending' },
  { key: '3', text: 'Buy fruit', status: 'Done' },

];

const TaskScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.topNav}>
        <AntDesign name="arrowleft" size={24} color="black" style={styles.backIcon} />
        <View style={styles.initialsContainer}>
          <Text style={styles.initialsText}>D A F +1</Text>
        </View>
      </View>
      <View style={styles.titleContainer}>
        <View style={[styles.initialBox, styles.boxF]}>
          <Text style={styles.initialLetter}>F</Text>
        </View>
        <Text style={styles.title}>Go to the market</Text>
        <Text style={styles.timeStamp}>5min ago</Text>
        <Text style={styles.description}>Prepare things to organize a weeding {'<3'}</Text>
      </View>
      <View style={styles.taskHeader}>
        <Text style={styles.taskCount}>You have 6 tasks</Text>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+ Add</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={tasksData}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text style={styles.taskText}>{item.text}</Text>
            <Text style={styles.taskStatus}>{item.status}</Text>
            <FontAwesome name="trash-o" size={24} color="red" style={styles.trashIcon} />
          </View>
        )}
        keyExtractor={(item) => item.key}
      />
      <View style={styles.footer}>
        <Text style={styles.completionText}>0/6 completed</Text>
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
  },
  taskStatus: {
    backgroundColor: '#ddd',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    color: 'black',
    fontSize: 14,
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
});

export default TaskScreen;
