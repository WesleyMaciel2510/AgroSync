import {configureStore} from '@reduxjs/toolkit';
import reducer from './reducer';
import mmkvMiddleware from './middleware/mmkvMiddleware';

// WORKING ========================================

/* const store = configureStore({reducer: reducer});

export default store; */

// ================================================
const store = configureStore({
  reducer: reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(mmkvMiddleware),
});

export default store;
// ================================================

//import loadStateFromMMKV from '../redux/middleware/mmkvLoader';
//import mmkvMiddleware from './middleware/mmkvMiddleware';

/* middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(mmkvMiddleware), */

//loadStateFromMMKV();
