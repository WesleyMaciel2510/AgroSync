import {useEffect} from 'react';
import {setLogin} from '../../../services/login';
import {useSharedState} from '../../../context/userInfo';
import LoginErrorAlert from '../../../components/alert/loginFailed';
import {useNavigation} from '@react-navigation/native';

export const useInit = () => {
  const {} = useSharedState();
  useEffect(() => {
    console.log('chamou useInit');
  }, []);
};

export const useOnLogin = () => {
  const navigation = useNavigation();

  const {name, password} = useSharedState();

  const handleLogin = async () => {
    console.log('chamou handleLogin');
    console.log('name = ', name);
    console.log('password = ', password);

    try {
      const loginResponse = await setLogin(name, password);
      console.log('loginResponse = ', loginResponse);
      if (loginResponse === true) {
        console.log('Login successful!');
        navigation.navigate('Home');
      } else if (loginResponse === 'Incorrect password') {
        console.log('Incorrect Password!');
        LoginErrorAlert('Incorrect Password! Please check your Password');
      } else {
        console.log('Login failed!');
        LoginErrorAlert();
      }
    } catch (error) {
      console.error('Error during login:', error);
      LoginErrorAlert();
    }
  };
  return {handleLogin};
};
