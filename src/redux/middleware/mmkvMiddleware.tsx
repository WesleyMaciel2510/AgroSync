import {MMKV} from 'react-native-mmkv';

const mmkv = new MMKV();

export const loadState = () => {
  try {
    const serializedState = mmkv.getString('redux-state');
    if (serializedState === null || serializedState === undefined) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Failed to load state', err);
    return undefined;
  }
};

const mmkvMiddleware = (storeAPI: any) => (next: any) => (action: any) => {
  const result = next(action);
  // Access the state from the `storeAPI` object
  const state = storeAPI.getState();
  mmkv.set('redux-state', JSON.stringify(state));
  return result;
};

export default mmkvMiddleware;
