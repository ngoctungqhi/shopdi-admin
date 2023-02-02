import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { apis } from '../apis/apis'
import { appSlice } from 'features/app/states/appSlice'

export const store = configureStore({
  reducer: {
    [apis.reducerPath]: apis.reducer,
    [appSlice.name]: appSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apis.middleware),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
