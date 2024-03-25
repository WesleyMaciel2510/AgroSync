import axios from 'axios';
import {serverURL} from '../../.env';

export const sendArrayofPictures = async (pictureObject: Object) => {
  console.log('chamou sendArrayofPictures');
  console.log('pictureObject = ', pictureObject);
  try {
    const response = await axios.post(
      `${serverURL}/api/pictures`,
      pictureObject,
    );
    console.log('sendArrayofPictures response:', response.data);
    return true;
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
