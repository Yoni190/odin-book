import React from 'react'
import { Outlet } from 'react-router'
import Header from './Header'
import Sidebar from './Sidebar'



const MainLayout = () => {
  return (
    <>
        <Header />
        <div className='grid grid-cols-[2fr_1fr]'>
            <Outlet />
            <Sidebar />
        </div>
    </>
  )
}

export default MainLayout