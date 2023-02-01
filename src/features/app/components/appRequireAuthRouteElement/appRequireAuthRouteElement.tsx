import { memo, FC } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAppRequireAuthRouteElement } from './useAppRequireAuthRouteElement'

export const AppRequireAuthRouteElement: FC = memo(() => {
  const { isLoggedIn, location } = useAppRequireAuthRouteElement()

  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ referrer: location }} replace />
  )
})
