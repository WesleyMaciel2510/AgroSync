import axios from 'axios';

export const sendDataToServer = async (
  name: string,
  email: string,
  password: string,
  accessLevel: number,
  isActive: boolean,
) => {
  console.log('chamou sendDataToServer');
  const dataToSend = {
    ID: 1,
    Name: name,
    Email: email,
    Password: password,
    AccessLevel: accessLevel,
    IsActive: isActive,
  };
  console.log('DATA = ', dataToSend);
  try {
    const response = await axios.post(
      'http://192.168.100.2:3000/api/users',
      dataToSend,
    );
    console.log('Server response:', response.data);
    return true;
  } catch (error: any) {
    console.error('Error sending data to server:', error);
    return false;
  }
};
