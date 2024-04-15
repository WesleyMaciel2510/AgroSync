import {configureStore} from '@reduxjs/toolkit';
import reducer from './reducer';
import mmkvMiddleware, {loadState} from './middleware/mmkvMiddleware';

// Load state from MMKV
const persistedState = loadState();

const store = configureStore({
  reducer: reducer,
  preloadedState: persistedState,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(mmkvMiddleware),
});

export default store;
