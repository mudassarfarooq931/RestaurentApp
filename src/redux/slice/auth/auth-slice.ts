import {AuthState} from '@redux/states';
import {createSlice} from '@reduxjs/toolkit';

//-------------------------------
const initialState: AuthState = {
  loading: false,
  signupLoading: false,
  currentUser: undefined,
};

//-----------------------------
const authSlice = createSlice({
  name: 'authSlice',
  initialState: initialState,
  reducers: {
    setCurrentUser: (state, {payload}) => {
      state.currentUser = payload;
    },
    setAuthLoading: (state, {payload}) => {
      state.loading = payload;
    },
    setSignupLoading: (state, {payload}) => {
      state.signupLoading = payload;
    },
    clearAllAuthStates: state => {
      state.currentUser = undefined;
      state.loading = false;
      state.signupLoading = false;
    },
  },
});

const authReducer = authSlice.reducer;
export const {
  setAuthLoading,
  setSignupLoading,
  setCurrentUser,
  clearAllAuthStates,
} = authSlice.actions;

export default authReducer;
