import axios from 'axios';
import {serverURL} from '../../.env';

export const deleteUser = async () => {
  console.log('chamou deleteServerData');
  const index = 5;
  try {
    const response = await axios.delete(`${serverURL}/api/users/${index}`);
    console.log('Server response:', response.data);
  } catch (error: any) {
    console.error('Error sending data to server:', error);
  }
};
