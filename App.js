import React,  { useState, useEffect, useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

// Import your screens
import LoginScreen from './src/components/LoginScreen/index.js';
import SignUpScreen from './src/components/SignUp/index.js';
import HelloWorldScreen from './src/components/HelloWorld/index.js';
import ProfileScreen from './src/components/ProfileScreen/index.js';
import PersonalProject from './src/components/PersonalProject/index.js';
import NewProjectScreen from './src/components/NewProjectScreen/index.js'
import TaskScreen from './src/components/ToDoScreen/index.js'
import SharedProjectsScreen from './src/components/SharedProject/index.js'
import SharedTaskScreen from './src/components/SharedTask/index.js'
import AuthContext from './src/server/AuthService.js';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


function StackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="PersonalProject"
      screenOptions={{
        animation: 'slide_from_right',
        
      }}
    >
   
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={({ route }) => ({
          tabBarStyle: { display: getTabBarVisibility(route) },
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={({ route }) => ({
          tabBarStyle: { display: getTabBarVisibility(route) },
          headerShown: false,
        })}
      />

      <Stack.Screen
        name="HelloWorld"
        component={HelloWorldScreen}
        options={({ route }) => ({
          tabBarStyle: { display: getTabBarVisibility(route) },
        
        })}
      />

      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={({ route }) => ({
          tabBarStyle: { display: getTabBarVisibility(route) },
        
        })}
      />

      <Stack.Screen
        name="PersonalProject"
        component={PersonalProject}
        options={({ route }) => ({
          tabBarStyle: { display: getTabBarVisibility(route) },
       
        })}
      />

      <Stack.Screen
        name="NewProject"
        component={NewProjectScreen}
        options={({ route }) => ({
          tabBarStyle: { display: getTabBarVisibility(route) },
      
        })}
      />

      <Stack.Screen
        name="todolist"
        component={TaskScreen}
        options={({ route }) => ({
          tabBarStyle: { display: getTabBarVisibility(route) },
       
        })}
      />

      <Stack.Screen
        name="sharedTasks"
        component={SharedTaskScreen}
        options={({ route }) => ({
          tabBarStyle: { display: getTabBarVisibility(route) },
      
        })}
      />

      <Stack.Screen
        name="sharedproject"
        component={SharedProjectsScreen}
        options={({ route }) => ({
          tabBarStyle: { display: getTabBarVisibility(route) },
     
        })}
      />
    </Stack.Navigator>
  );
}


const getTabBarVisibility = (route) => {
  const routeName = route.state
    ? route.state.routes[route.state.index].name
    : route.params?.screen ;

  if (['Login', 'SignUp', "WelcomeScreen", "NewProject"].includes(routeName)) {
    return 'none';
  }
  return 'flex';
};
// Main component
const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const authContextValue = {
    loggedIn,
    login: () => setLoggedIn(true),
    logout: () => setLoggedIn(false),
  };
  


  return (
    <AuthContext.Provider value={authContextValue}>
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Personal') {
              iconName = focused ? 'briefcase' : 'briefcase-outline'; 
            } else if (route.name === 'Shared') {
              iconName = focused ? 'people' : 'people-outline'; 
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            // Return the icon component
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray',
        })}
      >
       
        <Tab.Screen name="Personal" component={StackNavigator} />
        <Tab.Screen 
          name="Shared" 
          component={SharedProjectsScreen} 
          listeners={({ navigation }) => ({
            tabPress: event => {
             
              event.preventDefault();
              console.log(loggedIn); 
              if (!loggedIn) {
      
                navigation.navigate('Login');
              } else {
                
                navigation.navigate('Shared');
              }
            },
          })}
        />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        {/* Add other Tab.Screen components as needed */}
      </Tab.Navigator>
    </NavigationContainer>
    </AuthContext.Provider>
  );
};


export default App;
