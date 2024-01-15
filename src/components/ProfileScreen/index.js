import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import styles from './styles.js'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

const ProfileScreen = () => {
  const [avatar, setAvatar] = useState(null);
  const [personal, setpersonals] =  useState(null); 
  const [shares, setshares] = useState(null); 

  const setLocalAvatar = async (uri) => {
    try{
      await AsyncStorage.setItem('avatar', uri)
      console.log('avatar set to local')
      }catch(e){
        console.log(e)
      }
    }
  
  const getLocalAvatar = async () => {
    try{
      const value = await AsyncStorage.getItem('avatar')
      if(value !== null){
        console.log('avatar retrieved from local')
        return value
      }
    }catch(e){
      console.log(e)
    }
  }

  
  useEffect(() => {
    (
      async () => {
          const avatar = await getLocalAvatar()
          if(avatar){
            setLocalAvatar(avatar)
          }}
    )()}, [])
  
  
  const handleChangeAvatar = async() => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
    if(status !== 'granted'){
      Alert.alert('Sorry, we need camera roll permissions to make this work!');
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4,4],
      quality: 1,
    });
  
    if(!result.canceled){
      const imgURL = result.assets[0].uri
      setAvatar(imgURL)
      setLocalAvatar(imgURL)
    }
  }
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>
      
      <View style={styles.profileSection}>
        {/* <Image
          source={{ uri: 'E:/Schoolworks/Docker/Final_project/Group-planning/assets/favicon.png' }} // Replace with actual image source
          style={styles.profileImage}
        /> */}
        <TouchableOpacity onPress={handleChangeAvatar}>
          {
            avatar ? (
              <Image source={{ uri: avatar }} style={styles.profileImage} />
            ) : (
              <Ionicons name="person" size={55} style={{borderRadius: 100, backgroundColor: '#C2C2C2', padding: 30}}/>
            )
          }
        </TouchableOpacity>
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



export default ProfileScreen
