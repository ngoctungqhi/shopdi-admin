import { useState } from 'react'

export const useAccountSettings = () => {
  const [isShowChangePasswordDialog, setIsShowChangePasswordDialog] =
    useState(false)

  const handleOpenChangePasswordDialog = () => {
    setIsShowChangePasswordDialog(true)
  }

  const handleCloseChangePasswordDialog = () => {
    setIsShowChangePasswordDialog(false)
  }
  return {
    isShowChangePasswordDialog,
    handleCloseChangePasswordDialog,
    handleOpenChangePasswordDialog,
  }
}
