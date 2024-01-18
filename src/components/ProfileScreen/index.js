import React, { useEffect, useState,  useCallback ,useContext} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import styles from './styles.js'
import { getUser, uploadAva, downloadAva } from '../../server/AuthService.js';
import * as ImagePicker from 'expo-image-picker';
import {useProjectsCount} from "../../server/context.js"; 
import {useUser} from '../../server/context.js'; 
import AuthContext from '../../server/AuthService.js'; 


const ProfileScreen = ({ navigation }) => {
  const [avatar, setAvatar] = useState(null);
  const [personal, setpersonals] =  useState(0); 
  const [shares, setshares] = useState(0); 
  const {projectData, updateCount, setProjectData} = useProjectsCount(); 
  const { user, setUser } = useUser();
  const [userData , setuserData] = useState('Guest'); 
  const auth = useContext(AuthContext);

  const [LogOutButtonVisible , setLogOutButton] = useState(false); 


  useEffect(() => {
    if(auth.loggedIn== true){ 
      setLogOutButton(true); 
    }
    else { 
      setLogOutButton(false); 
    }
  }, [auth.loggedIn]);


    useFocusEffect(
      useCallback(() => {
        setProjectData(projectData);
        setpersonals(projectData.Personal_Projects); 
        setshares(projectData.Shared_Projects); 
  
        return ()=> {
      
        };
      }, [projectData])
    );

 

    useFocusEffect(
      useCallback(() => {
      getUser()
        .then(data => {
          console.log( data);
          setuserData(data.userName); 
      })
    }, [userData])); 

    
  useEffect(() => {
    if(LogOutButtonVisible){
      if(!avatar){
        (async () => {
          const cloudAvatar = await downloadAva(userData);
          if (cloudAvatar) {
            setAvatar(cloudAvatar);
          }
      })();
      }    
    }
  }, [userData])

   
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
      await uploadAva(result.assets[0].uri, userData)
      .then(() => {
        setAvatar(result.assets[0].uri);
      })
    }
  }

  const emailName= () => { 
    if(auth.loggedIn){ 
      return user; 
    }
    else{ 
      return "Please login to get the shared project data";
    }
  }


  const handleLogOut= () => { 
    setAvatar(null);
    setuserData('Guest');
    auth.logout(); 
    navigation.goBack(); 
  }; 
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
        { LogOutButtonVisible ? 
        (
          <TouchableOpacity onPress={handleChangeAvatar}>
          {
            avatar ? (
              <Image source={{ uri: avatar }} style={styles.profileImage} />
            ) : (
              <Ionicons name="person" size={55} style={{borderRadius: 100, backgroundColor: '#C2C2C2', padding: 20}}/>
            )
          }
        </TouchableOpacity>
        )
     :
          (
            <Ionicons name="person" size={55} style={{borderRadius: 100, backgroundColor: '#C2C2C2', padding: 20}}/>
          )
        }
        <Text style={styles.profileName}>{userData}</Text>
        <Text style={styles.profileEmail}>{ emailName() }</Text>
      </View>
      
      <View style={styles.statisticsSection}>
        <Text style={styles.statisticsTitle}>Statistics</Text>
        
        <View style={styles.statisticsItem}>
          <Text style={styles.statisticsItemTitle}>Personal Projects</Text>
          <Text style={styles.statisticsItemValue}>You have {personal} personal projects</Text>
        </View>
        
        <View style={styles.statisticsItem}>
          <Text style={styles.statisticsItemTitle}>Shared Projects</Text>
          <Text style={styles.statisticsItemValue}>You have {shares} shared project</Text>
        </View>

       
      </View>
      {LogOutButtonVisible && (
      <TouchableOpacity  style={styles.manageAccount} onPress={() => handleLogOut()}>
        <Text style={styles.manageAccountText}>Log out</Text>
      </TouchableOpacity>)}
      
      
    
      
  
    </ScrollView>
  );
};



export default ProfileScreen
