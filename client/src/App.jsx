import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { BrowserRouter, Route, Routes } from 'react-router'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'
import Header from './components/Header'
import MainLayout from './components/MainLayout'
import Profile from './pages/Profile'
import CloverDetails from './pages/CloverDetails'






function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Route>
        

        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path='/home' element={<Home />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/clover/:id' element={<CloverDetails />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
