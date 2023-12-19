import { configureStore,combineReducers } from '@reduxjs/toolkit';
import userReducer from './slices/user-slice'
import {thunk} from 'redux-thunk';

const rootReducer = combineReducers({
  userReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  })
};

// export const setupStore = () => {
//   return configureStore({
//     reducer: userReducer,
//     middleware: [thunk]
//   });
// };




