// MemberIndicator.js
import React from 'react';
import { View, Text } from 'react-native';

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
            backgroundColor: getRandomColor(),
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