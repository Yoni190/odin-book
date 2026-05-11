import React from 'react'
import { Outlet } from 'react-router'
import Header from './Header'


const MainLayout = () => {
  return (
    <>
        <Header />
        <Outlet />
    </>
  )
}

export default MainLayout