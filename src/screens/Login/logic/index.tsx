import {useEffect} from 'react';
import {setLogin} from '../../../services/login';
import {useSharedState} from '../../../context/userData';
import LoginErrorAlert from '../../../components/alert/loginFailed';

export const useInit = () => {
  const {} = useSharedState();
  useEffect(() => {
    console.log('chamou useInit');
  }, []);
};

export const useOnLogin = () => {
  const {username, password} = useSharedState();

  const handleLogin = async () => {
    console.log('chamou handleLogin');
    console.log('username = ', username);
    console.log('password = ', password);

    try {
      const loginResponse = await setLogin(username, password);
      console.log('loginResponse = ', loginResponse);
      if (loginResponse === true) {
        console.log('Login successful!');
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
