import {MMKV} from 'react-native-mmkv';
import store from '../store';

const mmkv = new MMKV();

export const loadSavedState = () => {
  const savedState = mmkv.getString('redux-state');
  if (savedState) {
    // Parse the stringified state back into a JavaScript object
    const parsedState = JSON.parse(savedState);
    // Dispatch the parsed state as the payload
    store.dispatch({type: 'LOAD_STATE', payload: parsedState});
  }
};
