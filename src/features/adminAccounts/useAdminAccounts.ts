import { useState } from 'react'

export const useAdminAccounts = () => {
  const [accounts, setAccounts] = useState([])

  const [isShowAdminAccountDialog, setIsShowAdminAccountDialog] =
    useState(false)

  const handleOpenAdminAccountEntryDialog = () => {
    setIsShowAdminAccountDialog(true)
  }

  const handleCloseAdminAccountEntryDialog = () => {
    setIsShowAdminAccountDialog(false)
  }

  return {
    accounts,
    isShowAdminAccountDialog,
    handleOpenAdminAccountEntryDialog,
    handleCloseAdminAccountEntryDialog,
  }
}
