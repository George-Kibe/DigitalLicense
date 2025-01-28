import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface CurrentUserState {
  user: User | null;
  isLoggedIn: boolean;
  showCodeBox: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  favorites: User[]
}

interface LoginPayload {
  user: User;
}

// Define the initial state
const initialState: CurrentUserState = {
  user: null,
  isLoggedIn: false,
  showCodeBox: true,
  accessToken: null,
  refreshToken: null,
  favorites: []
};

// Create the auth slice
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Add user and mark as logged in
    addCurrentUser: (state, action: PayloadAction<LoginPayload>) => {
      state.user = action.payload.user;
      state.isLoggedIn = true;
      state.showCodeBox = false;
    },
    editCurrentUser: (state, action: PayloadAction<LoginPayload>) => {
      state.user = action.payload.user;
      state.isLoggedIn = true;
    },
    addFavorite: (state, action: PayloadAction<User>) => {
       // Ensure `state.favorites` is an array
      if (!Array.isArray(state.favorites)) {
        state.favorites = [];
      }

      const isUserInFavorites = state.favorites.some(
        (favorite) => favorite._id === action.payload._id
      );

      if (!isUserInFavorites) {
        state.favorites.push(action.payload);
      } else {
        console.log('User is already in favorites');
      }
    },
    removeFavorite: (state, action: PayloadAction<User>) => {

      state.favorites = state.favorites.filter((favorite) => favorite._id !== action.payload._id);
    },
    removeCurrentUser: (state) => {
      console.log('Deleting current user data!');
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.showCodeBox = true;
      // state.favorites = [];
      state.isLoggedIn = false;
    },
  },
});

// Export the action creators
export const { 
  addCurrentUser, 
  editCurrentUser, 
  removeFavorite, 
  addFavorite, 
  removeCurrentUser 
} = userSlice.actions;

// Export the reducer
export default userSlice;