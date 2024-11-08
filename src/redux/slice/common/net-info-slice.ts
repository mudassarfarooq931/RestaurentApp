import {NetInfoState} from '@redux/states';
import {createSlice} from '@reduxjs/toolkit';

//---------------------------------------
const initialNetInfoState: NetInfoState = {
  isConnected: true,
};

//------------------------------
const netInfoSlice = createSlice({
  name: 'netInfoSlice',
  initialState: initialNetInfoState,
  reducers: {
    setIsConnected: (state, {payload}) => {
      state.isConnected = payload;
    },
  },
});

//--------------------------------------
const netInfoReducer = netInfoSlice.reducer;
export const {setIsConnected} = netInfoSlice.actions;
export default netInfoReducer;
