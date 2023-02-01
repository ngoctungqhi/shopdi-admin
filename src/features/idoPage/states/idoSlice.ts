import { createSlice } from '@reduxjs/toolkit'

type AppStateType = {
  isOpenIdoModal: boolean
  idoListRefreshTrigger: number
  isOpenIdoUpdateModal: boolean
}

const initialAppState: AppStateType = {
  isOpenIdoModal: false,
  idoListRefreshTrigger: 0,
  isOpenIdoUpdateModal: false,
}

export const idoSlice = createSlice({
  name: 'ido',
  initialState: initialAppState,
  reducers: {
    openIdoModal: (state) => {
      state.isOpenIdoModal = true
    },
    closeIdoModal: (state) => {
      state.isOpenIdoModal = false
    },
    idoUpdated: (state) => {
      state.idoListRefreshTrigger = state.idoListRefreshTrigger + 1
    },
    openIdoUpdateModal: (state) => {
      state.isOpenIdoUpdateModal = true
    },
    closeIdoUpdateModal: (state) => {
      state.isOpenIdoUpdateModal = false
    },
  },
})

export const {
  openIdoModal,
  closeIdoModal,
  openIdoUpdateModal,
  closeIdoUpdateModal,
  idoUpdated,
} = idoSlice.actions
