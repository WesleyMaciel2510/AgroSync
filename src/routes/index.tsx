import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSharedState} from '../context/userInfo';
import HomeScreen from '../screens/Home';
import LoginScreen from '../screens/Login';
import SignUpScreen from '../screens/SignUp';
import ForgotPasswordScreen from '../screens/ForgotPassword';

const AuthStack = createNativeStackNavigator();
const NonAuthStack = createNativeStackNavigator();

const AppStack = () => {
  const {isLogged} = useSharedState();
  //const retrievedUserString = storage.getString('ISLOGGED') || '{}';
  // Convert the JSON string back to an object
  //const retrievedUser = JSON.parse(retrievedUserString);

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
