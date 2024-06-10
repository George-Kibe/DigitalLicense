import {configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage'; // For async storage, you can also use other storage options like 'redux-persist-sensitive-storage'

import {authSlice} from './AuthSlice';

const persistUserConfig = {
  key: 'loggedUser',
  storage: AsyncStorage, // Use the storage you imported above
};

const persistedUser = persistReducer(persistUserConfig, authSlice.reducer);
const store = configureStore({
  reducer: {
    user: persistedUser,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false, // To disable the warning for non-serializable values (which will be handled by redux-persist)
    }),
});

const persistor = persistStore(store);

export {store, persistor};
