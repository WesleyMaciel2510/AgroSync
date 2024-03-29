import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSharedState} from '../context/globalUseState';
import HomeScreen from '../screens/Home';
import LoginScreen from '../screens/Login';
import SignUpScreen from '../screens/SignUp';
import ForgotPasswordScreen from '../screens/ForgotPassword';
import LoadInfoScreen from '../screens/Driver/loadInfo';
import InvoiceInfoScreen from '../screens/Driver/InvoiceInfo';
import SchedulingInfoScreen from '../screens/Operator/SchedulingInfo';
import PictureScreen from '../screens/Operator/Picture';
import CameraScreen from '../screens/Camera';
import ReaderCameraScreen from '../screens/ReaderCamera';
import DeniedPermissionScreen from '../screens/DeniedPermissionScreen/';
import NewScreen from '../screens/screen/index';

const AuthStack = createNativeStackNavigator();
//const DriverStack = createNativeStackNavigator();
//const ProducerStack = createNativeStackNavigator();
//const OperatorStack = createNativeStackNavigator();

const NonAuthStack = createNativeStackNavigator();

const AppStack = () => {
  const {isLogged /* , userType */} = useSharedState();

  return (
    <>
      {isLogged ? (
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
          <AuthStack.Screen
            name="SchedulingInfo"
            component={SchedulingInfoScreen}
          />
          <AuthStack.Screen name="Picture" component={PictureScreen} />
          <AuthStack.Screen name="Camera" component={CameraScreen} />
          <AuthStack.Screen
            name="ReaderCamera"
            component={ReaderCameraScreen}
          />
          <AuthStack.Screen
            name="DeniedPermission"
            component={DeniedPermissionScreen}
          />
          <AuthStack.Screen name="NewScreen" component={NewScreen} />
        </AuthStack.Navigator>
      ) : (
        <NonAuthStack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: true,
            headerTitle: '',
            headerBackVisible: true,
          }}>
          <NonAuthStack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerShown: false,
              headerTitle: '',
              headerBackVisible: false,
            }}
          />
          <NonAuthStack.Screen name="SignUp" component={SignUpScreen} />
          <NonAuthStack.Screen
            name="ForgotPassword"
            component={ForgotPasswordScreen}
          />
        </NonAuthStack.Navigator>
      )}
    </>
  );
};

export default AppStack;
