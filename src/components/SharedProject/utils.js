// MemberIndicator.js
import React from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';



  
export const saveMembersToStorage = async (projects) => {
    try {
      // Extract member names from all projects
      const allMembers = projects.reduce((acc, project) => {
        project.members.forEach(member => {
          // Check if member already saved to prevent duplicates
          if (!acc.some(m => m.name === member)) {
            acc.push({ name: member });
          }
        });
        return acc;
      }, []);
  
      // Save the members array to AsyncStorage
      const membersString = JSON.stringify(allMembers);
      await AsyncStorage.setItem('members', membersString);
    } catch (e) {
      console.error("Error saving members", e);
    }
  };

  export const getMemberByNameFromStorage = async (memberName) => {
    try {
      const membersString = await AsyncStorage.getItem('members');
      const members = membersString ? JSON.parse(membersString) : [];
  
      // Find the member by name
      const member = members.find(m => m.name === memberName);
  
      return member; // This will be undefined if the member is not found
    } catch (e) {
      console.error("Error retrieving member", e);
      return null; // Indicate an error occurred
    }
  };

export const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };


export const MemberIndicator = ({ members }) => {
    const getInitials = (name) => {
      return name.split(' ').map((n) => n[0]).join('');
    };
  
    if (!members || members.length === 0) {
      return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text>No members</Text>
        </View>
      );
    }
  
    const maxDisplay = 3; // Maximum members to display
  
    return (
      <View style={{ flexDirection: 'row', alignItems: 'stretch' }}>
        {members.slice(0, maxDisplay).map((member, index) => (
          <View key={index} style={{
            width: 30,
            height: 30,
            borderRadius: 15,
            backgroundColor: member.memberColor,
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: index === 0 ? 0 : -10,
            flexDirection: 'row',
          }}>
            <Text style={{ color: 'white' }}>{getInitials(member.name)}</Text>
          </View>
        ))}
  
        {members.length > maxDisplay && (
          <View style={{
            width: 30,
            height: 30,
            borderRadius: 15,
            backgroundColor: '#000', // Replace with desired color
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: -10,
            flexDirection: 'row',
          }}>
            <Text style={{ color: 'white' }}>...</Text>
          </View>
        )}
      </View>
    );
  };
  
  export default MemberIndicator;