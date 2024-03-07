import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSharedState} from '../context/userInfo';
import HomeScreen from '../screens/Home';
import LoginScreen from '../screens/Login';
import SignUpScreen from '../screens/SignUp';
import ForgotPasswordScreen from '../screens/ForgotPassword';

const ProducerStack = createNativeStackNavigator();
const OperatorStack = createNativeStackNavigator();
const DriverStack = createNativeStackNavigator();

const NonAuthStack = createNativeStackNavigator();

const AppStack = () => {
  const {isLogged, userType} = useSharedState();

  let userStack;

  if (isLogged) {
    switch (userType) {
      case 'Produtor Agrícola':
        userStack = (
          <ProducerStack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerShown: false,
              headerTitle: '',
              headerBackVisible: false,
            }}>
            <ProducerStack.Screen name="Home" component={HomeScreen} />
          </ProducerStack.Navigator>
        );
        break;
      case 'Operador de Armazém':
        userStack = (
          <OperatorStack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerShown: false,
              headerTitle: '',
              headerBackVisible: false,
            }}>
            <OperatorStack.Screen name="Home" component={HomeScreen} />
          </OperatorStack.Navigator>
        );
        break;
      case 'Transporte de Produtos':
        userStack = (
          <DriverStack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerShown: false,
              headerTitle: '',
              headerBackVisible: false,
            }}>
            <DriverStack.Screen name="Home" component={HomeScreen} />
          </DriverStack.Navigator>
        );
        break;
      default:
        break;
    }
  } else {
    userStack = (
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
    );
  }

  return userStack;
};

export default AppStack;
