import { StyleSheet} from 'react-native';


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    topNav: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 15,
    },
    backIcon: {
      marginRight: 10,
    },
    initialsContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    initialsText: {
      color: 'black',
    },
    titleContainer: {
      backgroundColor: '#f0f0f0',
      padding: 15,
      borderRadius: 10,
      margin: 15,
    },
    initialBox: {
      width: 50,
      height: 50,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 5,
    },
    boxF: {
      backgroundColor: 'blue',
    },
    initialLetter: {
      color: 'white',
      fontSize: 24,
      fontWeight: 'bold',
    },
    taskCard: {
      // ... your existing styles,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20, // Increased padding
      borderRadius: 20,
      backgroundColor: '#FFF', 
      shadowColor: '#000', // These shadow properties are for iOS
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5, // This is for Android
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    timeStamp: {
      fontSize: 12,
      color: 'gray',
    },
    description: {
      fontSize: 16,
    },
    taskHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 15,
    },
    taskCount: {
      fontSize: 16,
      fontWeight: 'bold',
    },
  
    noTasksText: {
      color: 'red',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop: 20, // Adjust the margin as needed
    },
    addButton: {
      backgroundColor: 'dodgerblue',
      borderRadius: 5,
      padding: 10,
    },
    addButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    taskItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
    },
    taskText: {
      fontSize: 16,
      flex: 1, 
      marginRight: 10, 
    },
    taskStatus: {
      backgroundColor: '#ddd',
      borderRadius: 10,
      paddingVertical: 5,
      paddingHorizontal: 10,
      color: 'black',
      fontSize: 14,
      minWidth: 80,
      textAlign: 'center', // Center the text inside the status
    },
    trashIcon: {
      padding: 5,
    },
    footer: {
      padding: 15,
    },
    completionText: {
      textAlign: 'center',
      fontSize: 16,
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
      backgroundColor: "#2196F3"
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: 'white',
      borderRadius: 5,
      padding: 20,
      width: '80%',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    option: {
      backgroundColor: '#F0F0F0',
      padding: 10,
      borderRadius: 5,
      marginTop: 10,
    },
    optionText: {
      textAlign: 'center',
      fontSize: 16,
      color: 'white', 
    },
  
    AddtaskView: {
      width: '90%', 
      height: '40%', 
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    addTaskbutton: {
      width: '100%',
      borderRadius: 5,
      padding: 10,
      elevation: 2,
      backgroundColor: "#2196F3"
    },
    addtaskTextInput: {
      width: '100%',
      height: '70%', 
      padding: 10,
      textAlign: 'left',
      textAlignVertical: 'top', 
      marginVertical: 10,
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 5
    }, 

    deleteOption: {
   
      borderRadius: 5,
      padding: 10,
      elevation: 2,
      backgroundColor: "#F66748", 
      marginBottom: 10, 
      
    }, 

    editmemberOption: {

      borderRadius: 5,
      padding: 10,
      elevation: 2,
      backgroundColor: "#2196F3"
    },  
  });
  
export default styles;