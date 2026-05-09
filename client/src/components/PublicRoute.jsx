import { Navigate, Outlet } from "react-router"



const PublicRoute = () => {
  const token = localStorage.getItem('token')

  return token ? <Navigate to='/home' replace /> : <Outlet />
}

export default PublicRoute