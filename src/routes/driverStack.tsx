import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home';
import LoadInfoScreen from '../screens/Driver/loadInfo';
import InvoiceInfoScreen from '../screens/Driver/InvoiceInfo';
import CameraScreen from '../screens/Camera';
import ReaderCameraScreen from '../screens/ReaderCamera';
import DeniedPermissionScreen from '../screens/DeniedPermission';
import FinishDriverScreen from '../screens/Driver/Finish';

const AuthStack = createNativeStackNavigator();

const DriverStackNavigator = () => {
  return (
    <AuthStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        headerTitle: '',
        headerBackVisible: false,
      }}>
      <AuthStack.Screen name="Home" component={HomeScreen} />
      <AuthStack.Screen name="LoadInfo" component={LoadInfoScreen} />
      <AuthStack.Screen name="InvoiceInfo" component={InvoiceInfoScreen} />
      <AuthStack.Screen name="Camera" component={CameraScreen} />
      <AuthStack.Screen name="ReaderCamera" component={ReaderCameraScreen} />
      <AuthStack.Screen
        name="DeniedPermission"
        component={DeniedPermissionScreen as React.ComponentType<any>}
      />
      <AuthStack.Screen name="FinishDriver" component={FinishDriverScreen} />
    </AuthStack.Navigator>
  );
};

export default DriverStackNavigator;
