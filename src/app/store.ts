import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import fileFolderItemsSliceReducer from '../features/fileManager/fileFolderItemsSlice'

export const store = configureStore({
  reducer: {
    filesAndFolders: fileFolderItemsSliceReducer
  },
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
