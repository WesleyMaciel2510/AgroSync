import {Alert} from 'react-native';

const LoginErrorAlert = (errorMessage?: string) => {
  Alert.alert(
    'Login Failed',
    errorMessage || 'Please check your credentials or try again later.',
    [
      {text: 'OK', onPress: () => console.log('Button OK Pressed!')},
      {text: 'Cancel', onPress: () => console.log('Button Cancel Pressed!')},
    ],
  );
};

export default LoginErrorAlert;
