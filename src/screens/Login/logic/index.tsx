import {useEffect} from 'react';
import {setLogin} from '../../../services/login';
import {useSharedState} from '../../../context/userInfo';
import LoginErrorAlert from '../../../components/alert/loginFailed';
import {useNavigation} from '@react-navigation/native';
import {storage} from '../../../context/storage';

export const useInit = () => {
  const {setIsLogged} = useSharedState();
  useEffect(() => {
    const storedIsLogged = storage.getBoolean('ISLOGGED') || false;
    setIsLogged(storedIsLogged);
  }, []);
};

export const useOnLogin = () => {
  const navigation = useNavigation();

  const {name, password, setIsLogged} = useSharedState();

  const handleLogin = async () => {
    console.log('chamou handleLogin');
    console.log('name = ', name);
    console.log('password = ', password);

    try {
      const loginResponse = await setLogin(name, password);
      // =======================================================
      // Convert the loginResponse object to a JSON string
      const loginResponseString = JSON.stringify(loginResponse);

      // Save the JSON string to MMKV storage
      storage.set('USERLOGGEDINFO', loginResponseString);
      storage.set('ISLOGGED', true);
      // =======================================================

      console.log('@Logic@ loginResponse = ', loginResponse);
      if (loginResponse) {
        console.log('Login successful!');
        setIsLogged(true);
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
