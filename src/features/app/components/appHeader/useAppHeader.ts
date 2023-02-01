import { openSelectWalletModal } from 'features/app/states/appSlice'
import { useCallback, useEffect } from 'react'
import { useAppDispatch } from 'states/hooks'
import { useWeb3React } from '@web3-react/core'
import { connectorsByName } from 'utils/web3React'
import { useAuth } from 'hooks/useAuth'
import { useNavigate } from 'react-router-dom'

export const useAppHeader = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { activate } = useWeb3React()
  const { logout } = useAuth()

  useEffect(() => {
    const provider = window.localStorage.getItem('provider')
    if (provider) activate(connectorsByName[provider])
  }, [activate])

  const handleOpenSelectWalletModal = useCallback(() => {
    dispatch(openSelectWalletModal())
  }, [dispatch])

  const handleLogout = useCallback(() => {
    logout()
    navigate('/login')
  }, [logout, navigate])

  return { handleOpenSelectWalletModal, handleLogout }
}
