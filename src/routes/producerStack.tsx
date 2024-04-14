import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home';
import DeniedPermissionScreen from '../screens/DeniedPermissionScreen/';
import ForecastScreen from '../screens/Producer/Forecast';

const AuthStack = createNativeStackNavigator();

const ProducerStackNavigator = () => {
  return (
    <AuthStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        headerTitle: '',
        headerBackVisible: false,
      }}>
      <AuthStack.Screen name="Home" component={HomeScreen} />
      <AuthStack.Screen name="ForecastScreen" component={ForecastScreen} />
      <AuthStack.Screen
        name="DeniedPermission"
        component={DeniedPermissionScreen as React.ComponentType<any>}
      />
    </AuthStack.Navigator>
  );
};

export default ProducerStackNavigator;
