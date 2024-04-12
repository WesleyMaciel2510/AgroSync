import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './reducer';

const store = configureStore({reducer: rootReducer});

export default store;

//import loadStateFromMMKV from '../redux/middleware/mmkvLoader';
//import mmkvMiddleware from './middleware/mmkvMiddleware';

/* middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(mmkvMiddleware), */

//loadStateFromMMKV();
