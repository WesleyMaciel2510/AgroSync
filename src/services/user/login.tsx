import axios from 'axios';
import {serverURL} from '../../.env';

export const setLogin = async (email: string, password: string) => {
  console.log('chamou setLogin');
  /* console.log(
    'ANTES DE ENVIAR OS DADOS = name = ',
    email,
    'password = ',
    password,
  ); */

  const data = {
    Email: email,
    Password: password,
  };

  try {
    const response = await axios.post(`${serverURL}/api/users/login`, data);
    console.log('response = ', response);
    console.log('serverURL = ', serverURL);
    if (response.status === 200) {
      console.log('@@@@ LOGIN SUCCESSFUL');
      console.log('response = ', response.data);
      return response.data;
    }
  } catch (error: any) {
    console.error('Error sending data to server:', error.code);
    if (error.code === 'ECONNABORTED' || error.code === 'ERR_NETWORK') {
      console.log('@@@@ Request timed out');
      return {timeout: true};
    } else if (error.response && error.response.status === 401) {
      console.log('@@@@ Incorrect password');
      return {passwordIncorrect: true};
    } else if (error.response && error.response.status === 404) {
      console.log('@@@@ User not found');
      return {userNotFound: true};
    }
    return false;
  }
};
