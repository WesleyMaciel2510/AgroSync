import {configureStore} from '@reduxjs/toolkit';
import reducer from './reducer';

const store = configureStore({reducer: reducer});

export default store;

//import loadStateFromMMKV from '../redux/middleware/mmkvLoader';
//import mmkvMiddleware from './middleware/mmkvMiddleware';

/* middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(mmkvMiddleware), */

//loadStateFromMMKV();
