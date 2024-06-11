import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loggedUser: null,
  loggedIn: false,
};

export const authSlice = createSlice({
  name: 'loggedUser',
  initialState,
  reducers: {
    addLoggedInUser: (state, action) => {
      const newUser = action.payload;
      console.log('From auth Slice: ', newUser);
      state.loggedUser = newUser;
      state.loggedIn = true;
    },
    logOutUser: state => {
      state.loggedUser = null;
      state.loggedIn = false;
    },
    setLogin: (state, action) => {
      console.log('setLogin: ', action.payload);
      state.loggedIn = action.payload;
    },
  },
});
