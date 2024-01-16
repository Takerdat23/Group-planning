import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';


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
    backgroundColor: '#F67171',
    marginVertical: 150,
  },
  manageAccountText: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#EAEAEA',
  },
});

export default styles;