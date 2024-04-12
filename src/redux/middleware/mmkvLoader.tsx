/* import {MMKV} from 'react-native-mmkv';
import store from '../store';

const mmkv = new MMKV();

const loadStateFromMMKV = () => {
  const savedState = mmkv.getString('redux-state');
  if (savedState) {
    const parsedState = JSON.parse(savedState);
    store.dispatch({type: 'LOAD_STATE', payload: parsedState});
  }
};

export default loadStateFromMMKV;
 */
