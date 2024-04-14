import {configureStore} from '@reduxjs/toolkit';
import reducer from './reducer';
import mmkvMiddleware from './middleware/mmkvMiddleware';
const store = configureStore({
  reducer: reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(mmkvMiddleware),
});

export default store;
