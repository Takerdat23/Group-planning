import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerTitle: {
      fontSize: 22,
      fontWeight: 'bold',
    },
    inviteSection: {
      flexDirection: 'row',
      padding: 10,
    },
    inviteInput: {
      flex: 1,
      borderWidth: 1,
      borderColor: 'grey',
      borderRadius: 5,
      marginRight: 10,
      paddingLeft: 10,
    },
    inviteButton: {
      backgroundColor: '#007bff',
      borderRadius: 5,
      padding: 15,
    },
    inviteButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    memberContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: 'grey',
    },
    initialCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
        },
    initial: {
        color: '#ffffff',
        fontWeight: 'bold',
        },
    memberInfo: {
        flex: 1,
        },
    memberName: {
        fontWeight: 'bold',
        },
    memberEmail: {
        color: 'grey',
        },
    memberRole: {
        color: 'navy',
        fontWeight: 'bold',
        },

});

export default styles; 
        
        