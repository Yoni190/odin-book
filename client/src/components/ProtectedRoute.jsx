import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { Navigate, Outlet } from "react-router"




const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const API_URL = import.meta.env.VITE_API_URL

  useEffect(() => {
    const verifyToken = async () => {
        const token = localStorage.getItem('token')

        if(!token) {
            setLoading(false)
            return
        }

        try {
            await axios.get(`${API_URL}/auth/verify-token`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            setIsAuthenticated(true)
        } catch (error) {
            localStorage.removeItem('token')
            setIsAuthenticated(false)
        } finally {
            setLoading(false)
        }
    }

    verifyToken()
  }, [])
  
  if(loading) {
    return <h1>Loading...</h1>
  }

  return isAuthenticated ? <Outlet /> : <Navigate to='/' replace />
}

export default ProtectedRoute