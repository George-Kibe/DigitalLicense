import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';

import userSlice from './userSlice';

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['currentUser'], // Only persist currentUser, add other keys as needed
};

const rootReducer = combineReducers({
  currentUser: userSlice.reducer,
  // other reducers
});

export type RootState = ReturnType<typeof rootReducer>;

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});

const persistor = persistStore(store);

export { store, persistor };