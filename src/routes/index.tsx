import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSharedState} from '../context/globalUseState';
import HomeScreen from '../screens/Home';
import LoginScreen from '../screens/Login';
import SignUpScreen from '../screens/SignUp';
import ForgotPasswordScreen from '../screens/ForgotPassword';
import LoadInfoScreen from '../screens/Driver/loadInfo';

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
        </AuthStack.Navigator>
      ) : (
        <NonAuthStack.Navigator
          initialRouteName="Home"
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
