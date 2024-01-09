import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import styles from './styles.js'
const ProfileScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>
      
      <View style={styles.profileSection}>
        <Image
          source={{ uri: 'E:/Schoolworks/Docker/Final_project/Group-planning/assets/favicon.png' }} // Replace with actual image source
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>Dilane3</Text>
        <Text style={styles.profileEmail}>abc123@gmail.com</Text>
      </View>
      
      <View style={styles.statisticsSection}>
        <Text style={styles.statisticsTitle}>Statistics</Text>
        
        <View style={styles.statisticsItem}>
          <Text style={styles.statisticsItemTitle}>Personal Projects</Text>
          <Text style={styles.statisticsItemValue}>You have 2 personal projects</Text>
        </View>
        
        <View style={styles.statisticsItem}>
          <Text style={styles.statisticsItemTitle}>Shared Projects</Text>
          <Text style={styles.statisticsItemValue}>You have 1 shared project</Text>
        </View>
      </View>
      
      <TouchableOpacity style={styles.manageAccount}>
        <Text style={styles.manageAccountText}>Manage Account</Text>
      </TouchableOpacity>
      
  
    </ScrollView>
  );
};



export default ProfileScreen;