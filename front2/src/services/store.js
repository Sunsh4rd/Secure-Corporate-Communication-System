import { configureStore,combineReducers } from '@reduxjs/toolkit';
import userReducer from './slices/user-slice'

const rootReducer = combineReducers({
  userReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  })
};



