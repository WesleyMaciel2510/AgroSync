import {useEffect} from 'react';
import {setLogin} from '../../../services/user/login';
import {useSharedState} from '../../../context/globalUseState';
import AlertComponent from '../../../components/Alert/alert';
import LoginErrorAlert from '../../../components/Alert/loginFailed';
import {useNavigation} from '@react-navigation/native';
import {storage} from '../../../redux/mmkv/storage';
import {setUserType, setIsLogged, setToken} from '../../../redux/actions';
import {useDispatch} from 'react-redux';
import RNRestart from 'react-native-restart';

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

  const {email, password, setName, setIsLoading} = useSharedState();

  const handleLogin = async () => {
    console.log('@chamou handleLogin');
    console.log('email = ', email);
    console.log('password = ', password);
    setIsLoading(true);

    try {
      const loginResponse = await setLogin(email, password);
      console.log('loginResponse = ', loginResponse);
      if (loginResponse?.timeout) {
        LoginErrorAlert(
          'Não foi possível se conectar com o servidor. Verifique sua conexão ou tente novamente mais tarde..',
        );
        setIsLoading(false);
      }
      if (loginResponse?.user.ID) {
        console.log('Login successful!');

        setName(loginResponse?.user.FullName);
        storage.set('loggedUserName', loginResponse?.user.FullName);
        storage.set('fullName', loginResponse?.user.FullName);
        dispatch(setUserType(loginResponse?.user.UserType));
        dispatch(setIsLogged(true));
        setIsLoading(false);
        if (loginResponse?.token) {
          dispatch(setToken(loginResponse?.token));
        }
        navigation.navigate('Home');
      } else if (loginResponse?.passwordIncorrect) {
        console.log('Incorrect Password!');
        LoginErrorAlert(
          'Senha Incorreta. Por favor, verifique ou redefina sua senha.',
        );
        setIsLoading(false);
      } else if (loginResponse?.userNotFound) {
        console.log('Login failed!');
        LoginErrorAlert(
          'Usuário não encontrado. Por favor, verifique o seu usuário.',
        );
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Erro no Login:', error);
      LoginErrorAlert();
      setIsLoading(false);
    }
  };
  return {handleLogin};
};

export const useOnResetCache = () => {
  const handleResetCache = async () => {
    console.log('AAAAAAAAAAAAAAA handleResetCache');
    AlertComponent({
      title: 'Limpar Dados Do APP',
      description: 'Tem certeza que deseja apagar os dados?',
      okButton: 'Confirmar',
      cancelButton: 'Cancelar',
      confirmAction: async () => {
        try {
          storage.clearAll();
          RNRestart.Restart();
          console.log('Cache cleared');
        } catch (error) {
          console.error('Error clearing data:', error);
        }
      },
    });
  };
  return {handleResetCache};
};
