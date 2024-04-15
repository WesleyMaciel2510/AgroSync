import {useEffect} from 'react';
import {setLogin} from '../../../services/user/login';
import {useSharedState} from '../../../context/globalUseState';
import LoginErrorAlert from '../../../components/Alert/loginFailed';
import {useNavigation} from '@react-navigation/native';
import {storage} from '../../../redux/mmkv/storage';
import {setUserType, setIsLogged} from '../../../redux/actions';
import {useDispatch} from 'react-redux';

export const useInit = () => {
  const {setName} = useSharedState();
  useEffect(() => {
    const storedFullName = storage.getString('fullName') || '';
    setName(storedFullName);
  }, [setName]);
};

export const useOnLogin = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {email, password, setName} = useSharedState();

  const handleLogin = async () => {
    console.log('chamou handleLogin');
    console.log('email = ', email);
    console.log('password = ', password);

    try {
      const loginResponse = await setLogin(email, password);
      console.log('@Logic@ loginResponse = ', loginResponse);
      console.log('@Logic@ loginResponse?.data = ', loginResponse?.data);

      if (loginResponse?.timeout) {
        LoginErrorAlert(
          'Não foi possível se conectar com o servidor. Verifique sua conexão ou tente novamente mais tarde..',
        );
      }
      if (loginResponse?.ID) {
        console.log('Login successful!');
        storage.set('loggedUserName', loginResponse.FullName);
        setName(loginResponse.FullName);
        storage.set('fullName', loginResponse.FullName);
        /*storage.set('ISLOGGED', true);
        setIsLogged(true); */
        dispatch(setUserType(loginResponse.UserType));
        dispatch(setIsLogged(true));
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
