import {Alert} from 'react-native';

const LoginErrorAlert = (errorMessage?: string) => {
  Alert.alert(
    'Erro no Login',
    errorMessage || 'Por favor, confira suas credenciais ou tente mais tarde.',
    [
      {text: 'OK', onPress: () => console.log('Button OK Pressed!')},
      {text: 'Cancel', onPress: () => console.log('Button Cancel Pressed!')},
    ],
  );
};

export default LoginErrorAlert;
