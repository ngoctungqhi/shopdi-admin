import { useCallback, useState, useEffect } from 'react'
import { useAppDispatch } from 'states/hooks'
import { useNavigate, useLocation } from 'react-router-dom'

export const useAppLayoutRouteElement = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const [collapsed, setCollapsed] = useState(false)
  const [selectedMenuItem, setSelectedMenuItem] = useState('/')

  useEffect(() => {
    setSelectedMenuItem(location.pathname)
  }, [location.pathname])

  const handleChaneMenu = useCallback(
    (e) => {
      navigate(e.key)
      setSelectedMenuItem(e.key)
    },
    [navigate]
  )

  return {
    collapsed,
    setCollapsed,
    handleChaneMenu,
    selectedMenuItem,
  }
}
