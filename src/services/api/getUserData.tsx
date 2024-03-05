import axios from 'axios';

export const getUserData = async () => {
  console.log('chamou getUserData');
  try {
    const response = await axios.get('http://192.168.100.2:3000/api/users');
    console.log('Server response:', response.data);
    return true;
  } catch (error: any) {
    console.error('Error sending data to server:', error);
    return false;
  }
};
