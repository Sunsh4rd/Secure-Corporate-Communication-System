import { createSlice } from '@reduxjs/toolkit';

const intitialState = {
  userData: null,
  loginingRequest: false,
  loginingRequestSuccess: false,
  loginingRequestFailed: false,
  registrationRequest: false,
  registrationRequestSuccess: false,
  registrationRequestFailed: false,
  getTasksRequest: false,
  getTasksRequestSuccess: false,
  getTasksRequestFailed: false,
  getUniqueTaskRequest: false,
  getUniqueTaskRequestSuccess: false,
  getUniqueTaskRequestFailed: false,
  taskUnique: null,
  tasksArray: [],
  error: null,
  stompClient: null,
  message: '',
  receivedMessage: '',
  isAdmin: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState: intitialState,
  reducers: {
    setStompClient: (state, action) => {
      state.stompClient = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    setReceivedMessage: (state, action) => {
      state.receivedMessage = action.payload;
    },
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
      state.userData = action.payload.name; 
      state.isAdmin = action.payload.isAdmin;

      console.log(state.isAdmin);
      console.log(state.userData);
    },
    loginingRequestFailed(state, action) {
      state.loginingRequest = false;
      state.loginingRequestFailed = true;
      state.error = action.payload
    },
    getTasksRequest(state) {
      state.getTasksRequest = true 
    },

    getTasksRequestSuccessed(state, action) {
      state.getTasksRequest = false; 
      state.getTasksRequestSuccess = true; 
      state.getTasksRequestFailed = false; 
      state.tasksArray = action.payload;
    },

    getTasksRequestFailed(state, action) {
      state.getTasksRequest = false;
      state.getTasksRequestFailed = true; 
      state.error = action.payload;
    },

    getUniqueTaskRequest(state) {
      state.getUniqueTaskRequest = true 
    },

    getUniqueTaskRequestSuccessed(state, action) {
      state.getUniqueTaskRequest = false; 
      state.getUniqueTaskRequestSuccess = true; 
      state.getUniqueTaskRequestFailed = false; 
      state.taskUnique = action.payload;
    },

    getUniqueTaskRequestFailed(state, action) {
      state.getUniqueTaskRequest = false;
      state.getUniqueTaskRequestFailed = true; 
      state.error = action.payload;
    },

    clearCurrentTaks(state) {
      state.taskUnique = null; 
    },
    

  },
})




export const { registrationRequest, 
  registrationRequestSuccessed,
  registrationRequestFailed,
  logingRequest,
  loginingRequestSuccess,
  loginingRequestFailed,
  getTasksRequestFailed,
  getTasksRequestSuccessed,
  getTasksRequest,
  getUniqueTaskRequest,
  getUniqueTaskRequestFailed,
  getUniqueTaskRequestSuccessed,
  clearCurrentTaks,
  setStompClient,
  setMessage,
  setReceivedMessage
 } = userSlice.actions;

export default userSlice.reducer