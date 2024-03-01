import axios from 'axios';

export const setLogin = async (username: string, password: string) => {
  console.log('chamou setLogin');
  console.log(
    'ANTES DE ENVIAR OS DADOS = username = ',
    username,
    'password = ',
    password,
  );

  const data = {
    Username: username,
    Password: password,
  };

  try {
    const response = await axios.post(
      'http://192.168.100.2:3000/api/users/login',
      data,
    );
    console.log('@@@@ Server response:', response.status);
    if (response.status === 200) {
      console.log('@@@@ FRONT RECEBEU TRUE');
      return [true];
    } else {
      console.log('@@@@ FRONT RECEBEU TRUE');
      return [false];
    }
  } catch (error) {
    console.error('Error sending data to server:', error);
    return false;
  }
};
