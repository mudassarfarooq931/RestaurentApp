import {AuthState} from '@redux/states';
import {createSlice} from '@reduxjs/toolkit';

//-------------------------------
const initialState: AuthState = {
  currentUser: '',
};

//-----------------------------
const authSlice = createSlice({
  name: 'authSlice',
  initialState: initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

const authReducer = authSlice.reducer;
export const {setCurrentUser} = authSlice.actions;
export default authReducer;
