import { useLocation } from 'react-router-dom'
import { useAppSelector } from 'states/hooks'

export const useAppRequireAuthRouteElement = () => {
  const location = useLocation()

  const isLoggedIn = useAppSelector((state) => state.app.token)

  return { isLoggedIn, location }
}
