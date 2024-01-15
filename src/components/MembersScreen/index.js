import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Make sure to install this package
import styles from './styles.js';
import {useUser} from '../../server/context.js'
const MemberScreen = ({route, navigation}) => {
  const { user } = useUser();
  const [members, setMembers] = useState([]);
  const {member_list} = route.params;
  const {onMemberChange}= route.params; 

  // Functions to handle member invitation and other actions would go here

  useEffect(() => {
    setMembers(member_list);
  }, []);
  

  const handleRemoveMember = (removedMember) => {
   
    setMembers(members => members.filter(member => member.name !== removedMember.name));
    onMemberChange(removedMember.name);
  };

  const renderMember = ({ item }) => {
    const initial = item.name[0];
    const isOwner = item.name === user.name; // Check if the member is the owner
    const backgroundColor =item.memberColor;

    return (
      <View style={styles.memberContainer}>
        <View style={[styles.initialCircle, { backgroundColor }]}>
          <Text style={styles.initial}>{initial}</Text>
        </View>
        <View style={styles.memberInfo}>
          <Text style={styles.memberName}>{item.name}</Text>
          <Text style={styles.memberEmail}>{item.email}</Text>
        </View>
        <Text style={styles.memberRole}>{isOwner ? 'Owner' : item.role}</Text>
        {!isOwner && ( // Only show the trash can if not the owner
          <TouchableOpacity onPress={() => handleRemoveMember(item)}>
            <FontAwesome name="trash-o" size={24} color="red" />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Members</Text>
      </View>
      <View style={styles.inviteSection}>
        <TextInput placeholder="Invite a new member" style={styles.inviteInput} />
        <TouchableOpacity style={styles.inviteButton}>
          <Text style={styles.inviteButtonText}>Invite</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={members}
        keyExtractor={item => item.id}
        renderItem={renderMember}
      />
    </View>
  );
};

export default MemberScreen;