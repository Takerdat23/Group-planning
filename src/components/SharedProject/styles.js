import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';





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
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },

  projectCard: {
    // ... your existing styles,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20, // Increased padding
    borderRadius: 20,
    backgroundColor: '#FFF', 
    shadowColor: '#000', // These shadow properties are for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // This is for Android
  },
  projectIcon: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },
  projectDetails: {
    flex: 1, // Adjust this as necessary to take up the appropriate space
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
  modalTextInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 200,
  },

  projectEntry: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
   
  },
  addMemberButton: {
  
    marginLeft: 10,
    padding: 10, 
  },
  addMemberButtonText: {

    borderRadius: 5,
    padding: 15,
    marginTop: 10,
  },

});

export default styles;
