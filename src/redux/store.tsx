import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './reducer';
import mmkvMiddleware from '../helpers/mmkvMiddleware';

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(mmkvMiddleware),
});

export default store;
