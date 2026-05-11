import React from 'react'
import { Link, useNavigate } from 'react-router'


const Header = () => {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/')
    }

  return (
    <header className='bg-red-800 text-white p-4 flex justify-between'>
        <Link to={'/home'}><h1 className='text-4xl font-semibold'>Clover</h1></Link>

        <button
            className='border p-1 rounded cursor-pointer hover:bg-white hover:text-red-800 transition'
            onClick={handleLogout}
        >
            Log Out
        </button>
    </header>
  )
}

export default Header