import axios from 'axios';
import {serverURL} from '../../.env';

export const updateUser = async () => {
  console.log('chamou updateUser');
  const index = 5;
  const data = {
    ID: index + 1,
    Name: 'Leão Batista',
    AccessLevel: 4,
    IsActive: true,
  };
  try {
    const response = await axios.put(`${serverURL}/api/users/${index}`, data);
    console.log('Server response:', response.data);
  } catch (error: any) {
    console.error('Error sending data to server:', error);
  }
};
