import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';

const ProfileScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>
      
      <View style={styles.profileSection}>
        <Image
          source={{ uri: '' }} // Replace with actual image source
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
      
      <View style={styles.navigation}>
        <Ionicons name="menu" size={24} color="black" />
        <MaterialCommunityIcons name="email-outline" size={24} color="black" />
        <FontAwesome name="user-circle-o" size={24} color="black" />
        <Ionicons name="settings-outline" size={24} color="black" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileSection: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#C4C4C4',
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  profileEmail: {
    fontSize: 16,
    color: '#A9A9A9',
  },
  statisticsSection: {
    paddingHorizontal: 20,
  },
  statisticsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingVertical: 10,
  },
  statisticsItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
  },
  statisticsItemTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  statisticsItemValue: {
    fontSize: 16,
    color: '#A9A9A9',
  },
  manageAccount: {
    paddingVertical: 15,
    alignItems: 'center',
    backgroundColor: '#EAEAEA',
    marginVertical: 10,
  },
  manageAccountText: {
    fontSize: 18,
    color: '#000000',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#EAEAEA',
  },
});

export default ProfileScreen;