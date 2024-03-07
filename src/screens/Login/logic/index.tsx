import {useEffect} from 'react';
import {setLogin} from '../../../services/api/login';
import {useSharedState} from '../../../context/userInfo';
import LoginErrorAlert from '../../../components/alert/loginFailed';
import {useNavigation} from '@react-navigation/native';
import {storage} from '../../../context/storage';

export const useInit = () => {
  const {setIsLogged, setName, setUserType} = useSharedState();
  useEffect(() => {
    const storedIsLogged = storage.getBoolean('ISLOGGED') || false;
    console.log('storedIsLogged = ', storedIsLogged);
    setIsLogged(storedIsLogged);
    const storedFullName = storage.getString('fullName') || '';
    setName(storedFullName);
    const storedUserType = storage.getString('loggedUserType') || '';
    setUserType(storedUserType);
  }, [setIsLogged, setName, setUserType]);
};

export const useOnLogin = () => {
  const navigation = useNavigation();

  const {email, password, setIsLogged, setName, setUserType} = useSharedState();

  const handleLogin = async () => {
    console.log('chamou handleLogin');
    console.log('email = ', email);
    console.log('password = ', password);

    try {
      const loginResponse = await setLogin(email, password);
      // =======================================================
      // Convert the loginResponse object to a JSON string
      //const loginResponseString = JSON.stringify(loginResponse);

      // Save the JSON string to MMKV storage
      //consider saving the object in smaller pieces to make the search faster
      //storage.set('USERLOGGEDINFO', loginResponseString);
      storage.set('loggedUserName', loginResponse.FullName);

      try {
      } catch (error) {
        console.error('Error setting loggedUserType:', error);
      }

      // =======================================================

      console.log('@Logic@ loginResponse = ', loginResponse);
      if (loginResponse) {
        console.log('Login successful!');
        storage.set('ISLOGGED', true);
        setIsLogged(true);
        setName(loginResponse.FullName);
        storage.set('fullName', loginResponse.FullName);
        setUserType(loginResponse.UserType);
        storage.set('loggedUserType', loginResponse.UserType);

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
