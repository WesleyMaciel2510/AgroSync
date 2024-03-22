import axios from 'axios';

export const SearchLoad = async (loadNumber: number) => {
  console.log('chamou searchLoad');
  console.log('loadNumber = ', loadNumber);
  console.log('loadNumber = ', typeof loadNumber);
  try {
    const response = await axios.get(
      `http://192.168.100.2:3000/api/loads/${loadNumber}`,
      {timeout: 5000},
    );
    console.log('Server response:', response.data);
    return {success: true, data: response.data};
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED' || error.code === 'ERR_NETWORK') {
        console.log('TIMEOUT');
        return {timeout: true};
      } else {
        console.error('Error sending data to server:', error);
      }
    } else {
      console.error('Unknown error occurred:', error);
    }
    throw error;
  }
};
