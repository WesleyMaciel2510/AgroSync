import axios from 'axios';

export const setLogin = async (name: string, password: string) => {
  console.log('chamou setLogin');
  console.log(
    'ANTES DE ENVIAR OS DADOS = name = ',
    name,
    'password = ',
    password,
  );

  const data = {
    name: name,
    Password: password,
  };

  try {
    const response = await axios.post(
      'http://192.168.100.2:3000/api/users/login',
      data,
    );
    console.log('@@@@ Server response:', response);
    if (response.status === 200) {
      console.log('@@@@ LOGIN SUCCESSFUL');
      return true;
    }
  } catch (error: any) {
    console.error('Error sending data to server:', error);
    if (error.response && error.response.status === 401) {
      console.log('@@@@ Incorrect password');
      return 'Incorrect password';
    } else if (error.response && error.response.status === 404) {
      console.log('@@@@ User not found');
      return 'User not found';
    }
    return false;
  }
};
