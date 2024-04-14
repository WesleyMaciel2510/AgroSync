import {MMKV} from 'react-native-mmkv';
import {Middleware} from 'redux';
import rootReducer from '../reducer';
import store from '../store';

const mmkv = new MMKV();

const mmkvMiddleware = (storeAPI: any) => (next: any) => (action: any) => {
  const result = next(action);
  // Access the state from the `storeAPI` object
  const state = storeAPI.getState();
  mmkv.set('redux-state', JSON.stringify(state));
  return result;
};

export default mmkvMiddleware;

// ==== last working code
/* const mmkvMiddleware = () => (next: any) => (action: any) => {
  const result = next(action);
  mmkv.set('redux-state', JSON.stringify(store.getState()));
  return result;
}; */
// ====
/* const mmkvMiddleware: Middleware<{}, RootState> =
  storeAPI => next => action => {
    const result = next(action);
    mmkv.set('redux-state', JSON.stringify(storeAPI.getState()));
    return result;
  }; */
