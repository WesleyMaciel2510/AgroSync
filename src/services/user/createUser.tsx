import axios from 'axios';
import {serverURL} from '../../.env';

export const createUser = async (userDataToSend: object) => {
  console.log('chamou createUser');
  console.log('DATA = ', userDataToSend);
  try {
    const response = await axios.post(`${serverURL}/api/users`, userDataToSend);
    console.log('Server response:', response.data);
    return true;
  } catch (error: any) {
    console.error('Error sending data to server:', error);
    return false;
  }
};
