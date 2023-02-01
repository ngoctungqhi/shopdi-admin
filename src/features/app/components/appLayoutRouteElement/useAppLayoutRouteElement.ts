import { closeSelectWalletModal } from 'features/app/states/appSlice'
import { useCallback, useState, useEffect } from 'react'
import { useAppSelector, useAppDispatch } from 'states/hooks'
import { useNavigate, useLocation } from 'react-router-dom'

export const useAppLayoutRouteElement = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const [collapsed, setCollapsed] = useState(false)
  const [selectedMenuItem, setSelectedMenuItem] = useState('/')

  const isOpenSelectWalletModal = useAppSelector(
    (state) => state.app.isOpenSelectWalletModal
  )

  useEffect(() => {
    setSelectedMenuItem(location.pathname)
  }, [location.pathname])

  const handleCancel = useCallback(() => {
    dispatch(closeSelectWalletModal())
  }, [dispatch])

  const handleChaneMenu = useCallback(
    (e) => {
      navigate(e.key)
      setSelectedMenuItem(e.key)
    },
    [navigate]
  )

  return {
    isOpenSelectWalletModal,
    handleCancel,
    collapsed,
    setCollapsed,
    handleChaneMenu,
    selectedMenuItem,
  }
}
