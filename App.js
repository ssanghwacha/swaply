// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native';

import HomeScreen from './screens/HomeScreen';
import ConvertScreen from './screens/ConvertScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: true,
          headerTitle: () => (
            <Image
              source={require('./assets/swaply.png')}
              style={{ width: 120, height: 40 }}
              resizeMode="contain"
            />
          ),
          headerStyle: {
            backgroundColor: '#fff',
      
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.15,
            shadowRadius: 4,
      
            elevation: 5,
          },
          headerTitleAlign: 'center',

          // tab icon
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: 'gray',
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Convert') {
              iconName = focused ? 'swap-horizontal' : 'swap-horizontal-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Home' }}
        />
        <Tab.Screen
          name="Convert"
          component={ConvertScreen}
          options={{ title: 'Convert' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}