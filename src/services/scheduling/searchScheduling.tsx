import axios from 'axios';

export const searchScheduling = async (schedulingNumber: number) => {
  console.log('chamou searchScheduling');
  console.log('schedulingNumber = ', schedulingNumber);
  console.log('schedulingNumber = ', typeof schedulingNumber);
  try {
    const response = await axios.get(
      `http://192.168.100.2:3000/api/schedulings/${schedulingNumber}`,
    );
    console.log('Server response:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        console.log('TIMEOUT');
      } else {
        console.error('Error sending data to server:', error);
      }
    } else {
      console.error('Unknown error occurred:', error);
    }
    throw error;
  }
};
