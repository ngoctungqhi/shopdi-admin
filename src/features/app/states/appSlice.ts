import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GetAccountInfoResponse } from '../apis/models/getAccountInfo/response'

type AppStateType = {
  token?: string
  loggedInUser: GetAccountInfoResponse | null
}

const initialAppState: AppStateType = {
  token: localStorage.getItem('token') || undefined,
  loggedInUser: JSON.parse(localStorage.getItem('loggedInUser')) || null,
}

export const appSlice = createSlice({
  name: 'app',
  initialState: initialAppState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
      localStorage.setItem('token', state.token)
    },
    setLoggedInUser: (state, action: PayloadAction<GetAccountInfoResponse>) => {
      state.loggedInUser = action.payload
      localStorage.setItem('loggedInUser', JSON.stringify(state.loggedInUser))
    },
    removeToken: (state) => {
      state.token = undefined
      localStorage.removeItem('token')
      state.loggedInUser = null
      localStorage.removeItem('loggedInUser')
    },
  },
})

export const { setToken, removeToken, setLoggedInUser } = appSlice.actions
