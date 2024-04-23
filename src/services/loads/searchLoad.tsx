import axios from 'axios';
import {serverURL} from '../../.env';

export const searchLoad = async (loadNumber: number) => {
  console.log('chamou searchLoad');
  try {
    console.log('entrou no try');
    console.log('searchLoad@ loadNumber = ', loadNumber);
    console.log('serverURL = ', serverURL);

    const response = await axios.get(`${serverURL}/api/loads/${loadNumber}`);

    //console.log('Server response data:', response.data);
    //console.log('response.data.length:', response.data.length);

    if (response.data.length > 0) {
      return {success: true, data: response.data};
    } else {
      return {success: false, data: []};
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error.code = ', error.code);
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
