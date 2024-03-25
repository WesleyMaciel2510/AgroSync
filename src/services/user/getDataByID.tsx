import axios from 'axios';
import {serverURL} from '../../.env';

export const getDataByID = async () => {
  console.log('chamou getDataByID');
  try {
    const index = 5;
    const response = await axios.get(`${serverURL}/api/users/${index}`);
    console.log('Server response:', response.data);
  } catch (error: any) {
    console.error('Error sending data to server:', error);
  }
};
