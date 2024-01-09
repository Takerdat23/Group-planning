import React from 'react';
import { View, Text, Button } from 'react-native';
import styles from './styles.js'

const HelloWorldScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello World</Text>
      <Button 
        title="Home" 
        onPress={() => navigation.navigate('Login')} 
      />
    </View>
  );
};

export default HelloWorldScreen; 

