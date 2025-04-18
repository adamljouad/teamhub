import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '../pages/login.jsx'
import Dashboard from '../pages/Dashboard.js'
import { useAuth } from '../context/AuthContext.jsx'

const AppRoutes = () => {
  const { isAuthenticated } = useAuth()

  return (
    <Routes>
      <Route 
        path="/login" 
        element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} 
      />
      <Route 
        path="/dashboard" 
        element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
      />
      <Route 
        path="*" 
        element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} 
      />
    </Routes>
  )
}

export default AppRoutes
