import axios from 'axios';

export const setLogin = async (email: string, password: string) => {
  console.log('chamou setLogin');
  console.log(
    'ANTES DE ENVIAR OS DADOS = name = ',
    email,
    'password = ',
    password,
  );

  const data = {
    Email: email,
    Password: password,
  };

  try {
    const response = await axios.post(
      'http://192.168.100.2:3000/api/users/login',
      //'http://localhost:3000/api/users/login',
      data,
      {timeout: 5000}, // 5 seconds
    );
    if (response.status === 200) {
      console.log('@@@@ LOGIN SUCCESSFUL');
      console.log('response = ', response.data);
      //console.log('@ setLogin @ response= ', response.config.data);
      return response.data;
    }
  } catch (error: any) {
    console.error('Error sending data to server:', error);
    if (error.code === 'ECONNABORTED') {
      console.log('@@@@ Request timed out');
      return 'Request timed out';
    } else if (error.response && error.response.status === 401) {
      console.log('@@@@ Incorrect password');
      return 'Incorrect password';
    } else if (error.response && error.response.status === 404) {
      console.log('@@@@ User not found');
      return 'User not found';
    }
    return false;
  }
};
