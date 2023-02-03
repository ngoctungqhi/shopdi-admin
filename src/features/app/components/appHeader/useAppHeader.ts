import { removeToken } from 'features/app/states/appSlice'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'states/hooks'

export const useAppHeader = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const loggedInUser = useAppSelector((state) => state.app.loggedInUser)

  const handleLogout = useCallback(() => {
    dispatch(removeToken())
    navigate('/login')
  }, [dispatch, navigate])

  return { handleLogout, loggedInUser }
}
