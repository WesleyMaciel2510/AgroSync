import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home';
import SchedulingInfoScreen from '../screens/Operator/SchedulingInfo';
import PictureScreen from '../screens/Operator/Picture';
import CameraScreen from '../screens/Camera';
import ReaderCameraScreen from '../screens/ReaderCamera';
import DeniedPermissionScreen from '../screens/DeniedPermission';
import FinishOperatorScreen from '../screens/Operator/Finish/index';

const AuthStack = createNativeStackNavigator();

const OperatorStackNavigator = () => {
  return (
    <>
      <AuthStack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          headerTitle: '',
          headerBackVisible: false,
        }}>
        <AuthStack.Screen name="Home" component={HomeScreen} />
        <AuthStack.Screen
          name="SchedulingInfo"
          component={SchedulingInfoScreen}
        />
        <AuthStack.Screen name="Picture" component={PictureScreen} />
        <AuthStack.Screen name="Camera" component={CameraScreen} />
        <AuthStack.Screen name="ReaderCamera" component={ReaderCameraScreen} />
        <AuthStack.Screen
          name="DeniedPermission"
          component={DeniedPermissionScreen as React.ComponentType<any>}
        />
        <AuthStack.Screen
          name="FinishOperator"
          component={FinishOperatorScreen}
        />
      </AuthStack.Navigator>
    </>
  );
};

export default OperatorStackNavigator;
