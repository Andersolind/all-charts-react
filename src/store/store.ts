import { configureStore } from '@reduxjs/toolkit';

import statsReducer from '../features/campus/campusSlice'
const store = configureStore({
  reducer: {
    stats: statsReducer, // Add the users slice here
  },
});
export type RootState = ReturnType<typeof store.getState>;  // This infers the state type from your reducers

export type AppDispatch = typeof store.dispatch;

export default store;