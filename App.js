import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

// Import your screens
import LoginScreen from './src/components/login_screen2.js';
import HelloWorldScreen from './src/components/helloworldscreen';
import WelcomeScreen from './src/components/welcomescreen.js';
import ProfileScreen from './src/components/ProfileScreen.js';
import SettingsScreen from './src/components/SettingScreen.js';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


function StackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="WelcomeScreen"
      screenOptions={{
        animation: 'slide_from_right',
        
      }}
    >
      <Stack.Screen
        name="WelcomeScreen"
        component={WelcomeScreen}
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
          title: 'Welcome',
        })}
      />

      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={({ route }) => ({
          tabBarStyle: { display: getTabBarVisibility(route) },
          title: 'profile',
        })}
      />
    
    </Stack.Navigator>
  );
}


const getTabBarVisibility = (route) => {
  const routeName = route.state
    ? route.state.routes[route.state.index].name
    : route.params?.screen ;

  if (['Login', 'SignUp', "WelcomeScreen"].includes(routeName)) {
    return 'none';
  }
  return 'flex';
};
// Main component
const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-outline';
            }
         
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
   
        <Tab.Screen name="Home" component={StackNavigator} options={{ headerShown: false }} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
     
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
