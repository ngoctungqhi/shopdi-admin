import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type AppStateType = {
  token?: string
  isOpenSelectWalletModal: boolean
}

const initialAppState: AppStateType = {
  token: localStorage.getItem('token') || undefined,
  isOpenSelectWalletModal: false,
}

export const appSlice = createSlice({
  name: 'app',
  initialState: initialAppState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
      localStorage.setItem('token', state.token)
    },
    openSelectWalletModal: (state) => {
      state.isOpenSelectWalletModal = true
    },
    closeSelectWalletModal: (state) => {
      state.isOpenSelectWalletModal = false
    },
  },
})

export const { setToken, openSelectWalletModal, closeSelectWalletModal } =
  appSlice.actions
