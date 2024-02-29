import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import PrivacyPolicyScreen from '../screens/PrivacyPolicy';
import ProfileScreen from '../screens/Profile';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        headerTitle: '',
        headerBackVisible: false,
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default AppStack;
