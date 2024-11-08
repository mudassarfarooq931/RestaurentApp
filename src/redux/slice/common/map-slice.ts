import {MapState} from '@redux/states';
import {createSlice} from '@reduxjs/toolkit';

//-------------------------------
const initialState: MapState = {
  city: '',
  area: '',
};

//-----------------------------
const mapSlice = createSlice({
  name: 'mapSlice',
  initialState: initialState,
  reducers: {
    setCity: (state, {payload}) => {
      state.city = payload;
    },
    setArea: (state, {payload}) => {
      state.area = payload;
    },
    clearAllMapState: state => {
      state.city = '';
      state.area = '';
    },
  },
});

const mapReducer = mapSlice.reducer;
export const {setCity, setArea, clearAllMapState} = mapSlice.actions;
export default mapReducer;
