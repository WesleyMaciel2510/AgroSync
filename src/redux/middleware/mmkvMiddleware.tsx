import {MMKV} from 'react-native-mmkv';
import {Middleware} from 'redux';
import rootReducer from '../reducer';

const mmkv = new MMKV();
type RootState = ReturnType<typeof rootReducer>;
const mmkvMiddleware: Middleware<{}, RootState> =
  storeAPI => next => action => {
    const result = next(action);
    mmkv.set('redux-state', JSON.stringify(storeAPI.getState()));
    return result;
  };

export default mmkvMiddleware;
