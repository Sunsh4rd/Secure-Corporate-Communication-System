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
  sentNewStatusRequest: false,
  sentNewStatusRequestSuccess: false,
  sentNewStatusRequestFailed: false,
  getAllNotAssigneeRequest: false,
  getAllNotAssigneeRequestSucces: false,
  getAllNotAssigneeRequestFailed: false,
  addNewAssigneeRequest: false,
  addNewAssigneeRequestSuccess: false,
  addNewAssigneeRequestFailed: false,
  addNewTaskRequest: false,
  addNewTaskRequestSuccess: false,
  addNewTaskRequestFailed: false,
  allAssignees: [], 
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
      console.log(action.payload.isAdmin);
      state.loginingRequest = false;
      state.loginingRequestSuccess = true;
      state.userData = action.payload.name; 
      state.isAdmin = action.payload.isAdmin;
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

    sentNewStatusRequest(state) {
      state.sentNewStatusRequest = true;
      state.sentNewStatusRequestSuccess = false;
      state.sentNewStatusRequestFailed = false;
    },
    sentNewStatusRequestSuccess(state) {
      state.sentNewStatusRequest = false;
      state.sentNewStatusRequestSuccess = true;
      state.sentNewStatusRequestFailed = false;
    },
    sentNewStatusRequestFailed(state, action) {
      state.sentNewStatusRequest = false;
      state.sentNewStatusRequestSuccess = false;
      state.sentNewStatusRequestFailed = true;
      state.error = action.payload;
    },

    getAllNotAssigneeRequest(state) {
      state.getAllNotAssigneeRequest = true;
      state.getAllNotAssigneeRequestSuccess = false;
      state.getAllNotAssigneeRequestFailed = false;
    },

    getAllNotAssigneeRequestSuccess(state, action) {
      state.getAllNotAssigneeRequest = false;
      state.getAllNotAssigneeRequestSuccess = true;
      state.getAllNotAssigneeRequestFailed = false;
      state.allAssignees = action.payload;
    },

    getAllNotAssigneeRequestFailed(state, action) {
      state.getAllNotAssigneeRequest = false;
      state.getAllNotAssigneeRequestSuccess = false;
      state.getAllNotAssigneeRequestFailed = true;
      state.error = action.payload
    },

    addNewAssigneeRequest(state) {
      state.addNewAssigneeRequest = true;
      state.addNewAssigneeRequestSuccess = false;
      state.addNewAssigneeRequestFailed = false;
    },

    addNewAssigneeRequestSucces(state) {
      state.addNewAssigneeRequest = false;
      state.addNewAssigneeRequestSuccess = true;
      state.addNewAssigneeRequestFailed = false;
    },

    addNewAssigneeRequestFailed(state, action) {
      state.addNewAssigneeRequest = false;
      state.addNewAssigneeRequestSuccess = false;
      state.addNewAssigneeRequestFailed = true;
      state.error = action.payload;
    },

    addNewTaskRequest(state) {
      state.addNewTaskRequest = true;
      state.addNewTaskRequestSuccess = false;
      state.addNewTaskRequestFailed = false;
    },

    addNewTaskRequestSuccess(state) {
      state.addNewTaskRequest = false;
      state.addNewTaskRequestSuccess = true;
      state.addNewTaskRequestFailed = false;
    },

    addNewTaskRequestFailed(state) {
      state.addNewTaskRequest = false;
      state.addNewTaskRequestSuccess = false;
      state.addNewTaskRequestFailed = true;
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
  setReceivedMessage,
  sentNewStatusRequest,
  sentNewStatusRequestSuccess,
  sentNewStatusRequestFailed,
  getAllNotAssigneeRequest,
  getAllNotAssigneeRequestSuccess,
  getAllNotAssigneeRequestFailed,
  addNewAssigneeRequest,
  addNewAssigneeRequestSucces,
  addNewAssigneeRequestFailed,
  addNewTaskRequest,
  addNewTaskRequestSuccess,
  addNewTaskRequestFailed,
 } = userSlice.actions;

export default userSlice.reducer