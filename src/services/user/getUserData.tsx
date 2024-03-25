import axios from 'axios';
import {serverURL} from '../../.env';

export const getUserData = async () => {
  console.log('chamou getUserData');
  try {
    const response = await axios.get(`${serverURL}/api/users`);
    console.log('Server response:', response.data);
    return true;
  } catch (error: any) {
    console.error('Error sending data to server:', error);
    return false;
  }
};
