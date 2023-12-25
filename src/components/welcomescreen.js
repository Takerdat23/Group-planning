import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Image } from 'react-native';
import logo from 'E:/Schoolworks/Docker/Final_project/Group-planning/assets/DallE_teamSync_logo.png';

const WelcomeScreen = ({ navigation }) => {

    useEffect(() => {
        const timer = setTimeout(() => {
          navigation.navigate("Login");
        }, 2000);
    
        return () => clearTimeout(timer);
      }, [navigation]);
    
      return (
        <View style={styles.container}>
          <Image source={logo} style={styles.logo} />
        </View>
      );
    };
const styles = StyleSheet.create({
    container: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#3f6e7e',
        },
    logo: {
          width: 200,
          height: 200,
        },
      });
export default WelcomeScreen;