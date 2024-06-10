import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loggedUser: null,
};

export const authSlice = createSlice({
  name: 'loggedUser',
  initialState,
  reducers: {
    addLoggedInUser: (state, action) => {
      const newUser = action.payload;
      console.log('From auth Slice: ', newUser);
      state.loggedUser = newUser;
    },
    logOutUser: state => {
      state.loggedUser = null;
    },
  },
});
