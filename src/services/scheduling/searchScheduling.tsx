import axios from 'axios';
import {serverURL} from '../../.env';

export const SearchScheduling = async (schedulingNumber: number) => {
  console.log('chamou SearchScheduling');
  console.log('schedulingNumber = ', schedulingNumber);
  console.log('schedulingNumber = ', typeof schedulingNumber);
  try {
    const response = await axios.get(
      `${serverURL}/api/schedulings/${schedulingNumber}`,
      {timeout: 5000},
    );
    console.log('Server response:', response.data);
    return {success: true, data: response.data};
  } catch (error: any) {
    console.log('@@@@@@@@ error = ', error.code);
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED' || error.code === 'ERR_NETWORK') {
        console.log('TIMEOUT');
        return {timeout: true};
      } else {
        console.error('Unknown error occurred:', error);
      }
    }
    throw error;
  }
};
