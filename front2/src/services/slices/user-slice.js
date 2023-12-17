import { createSlice } from '@reduxjs/toolkit';

const intitialState = {
  userData: null,
  loginingRequest: false,
  loginingRequestSuccess: false,
  loginingRequestFailed: false,
  registrationRequest: false,
  registrationRequestSuccess: false,
  registrationRequestFailed: false,
  error: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState: intitialState,
  reducers: {
    registrationRequest(state) {
      state.registrationRequest = true 
    },
    registrationRequestSuccessed(state) {
      state.registrationRequest = false; 
      state.registrationRequestSuccess = true; 
      state.registrationRequestFailed = false; 
    },
    registrationRequestFailed(state, action) {
      state.registrationRequest = false;
      state.registrationRequestFailed = true; 
      state.error = action.payload;
    },
    logingRequest(state) {
      state.loginingRequest = true; 
    },
    loginingRequestSuccess(state, action) {
      state.loginingRequest = false;
      state.loginingRequestSuccess = true;
      state.userData = action.payload; 
      state.isUserAuth = true;
    },
    loginingRequestFailed(state, action) {
      state.loginingRequest = false;
      state.loginingRequestFailed = true;
      state.error = action.payload
    },
  },
})




export const { registrationRequest, 
  registrationRequestSuccessed,
  registrationRequestFailed,
  logingRequest,
  loginingRequestSuccess,
  loginingRequestFailed,
 } = userSlice.actions;

export default userSlice.reducer