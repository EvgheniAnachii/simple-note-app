import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import fileManagerReducer from '../features/fileManager/fileManagerSlice';

export const store = configureStore({
  reducer: {
    fileManager: fileManagerReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
