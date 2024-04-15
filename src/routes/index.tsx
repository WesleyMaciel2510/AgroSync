import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/Login';
import SignUpScreen from '../screens/SignUp';
import ForgotPasswordScreen from '../screens/ForgotPassword';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/types';
import DriverStackNavigator from './operatorStack';
import OperatorStackNavigator from './operatorStack';
import ProducerStackNavigator from './operatorStack';

const AppStack = () => {
  /* const selectUserType = (state: RootState) => state.userType;
  const USERTYPE = useSelector(selectUserType);
  const selectIsLogged = (state: RootState) => state.isLogged;
  const ISLOGGED = useSelector(selectIsLogged); */
  const reducer = useSelector((state: RootState) => state);
  useEffect(() => {
    console.log('ISLOGGED = ', reducer.isLogged);
  }, [reducer.isLogged]);

  const NonAuthStack = createNativeStackNavigator();

  return (
    <>
      {reducer.isLogged ? (
        <>
          {reducer.userType === 'Motorista' && <DriverStackNavigator />}
          {reducer.userType === 'Operador' && <OperatorStackNavigator />}
          {reducer.userType === 'Produtor' && <ProducerStackNavigator />}
        </>
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
