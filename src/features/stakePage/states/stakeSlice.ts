import { createSlice } from '@reduxjs/toolkit'

type AppStateType = {
  isOpenStakeSettingDialog: boolean
  stakeRefreshTrigger: number
}

const initialAppState: AppStateType = {
  isOpenStakeSettingDialog: false,
  stakeRefreshTrigger: 0,
}

export const stakeSlice = createSlice({
  name: 'stake',
  initialState: initialAppState,
  reducers: {
    openStakeSettingDialog: (state) => {
      state.isOpenStakeSettingDialog = true
    },
    closeStakeSettingDialog: (state) => {
      state.isOpenStakeSettingDialog = false
    },
    stakeUpdated: (state) => {
      state.stakeRefreshTrigger = state.stakeRefreshTrigger + 1
    },
  },
})

export const { openStakeSettingDialog, closeStakeSettingDialog, stakeUpdated } =
  stakeSlice.actions
