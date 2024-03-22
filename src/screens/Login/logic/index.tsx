import {useEffect} from 'react';
import {setLogin} from '../../../services/user/login';
import {useSharedState} from '../../../context/globalUseState';
import LoginErrorAlert from '../../../components/Alert/loginFailed';
import {useNavigation} from '@react-navigation/native';
import {storage} from '../../../helpers/storage';

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

      // =======================================================
      console.log('@Logic@ loginResponse = ', loginResponse);

      if (loginResponse?.timeout) {
        LoginErrorAlert(
          'Não foi possível se conectar com o servidor. Verifique sua conexão ou tente novamente mais tarde..',
        );
      }
      if (loginResponse?.data) {
        console.log('Login successful!');
        storage.set('loggedUserName', loginResponse.FullName);
        storage.set('ISLOGGED', true);
        setIsLogged(true);
        setName(loginResponse.FullName);
        storage.set('fullName', loginResponse.FullName);
        setUserType(loginResponse.UserType);
        storage.set('loggedUserType', loginResponse.UserType);
        navigation.navigate('Home');
      } else if (loginResponse?.passwordIncorrect) {
        console.log('Incorrect Password!');
        LoginErrorAlert(
          'Senha Incorreta. Por favor, verifique ou redefina sua senha.',
        );
      } else if (loginResponse?.userNotFound) {
        console.log('Login failed!');
        LoginErrorAlert(
          'Usuário não encontrado. Por favor, verifique o seu usuário.',
        );
      }
    } catch (error) {
      console.error('Erro no Login:', error);
      LoginErrorAlert();
    }
  };
  return {handleLogin};
};
