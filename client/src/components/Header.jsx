import { CircleUserRound } from 'lucide-react'
import React from 'react'
import { Link, useNavigate } from 'react-router'



const Header = () => {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/')
    }

  return (
    <header className="bg-gradient-to-r from-red-800 via-red-700 to-red-900 text-white p-4 flex justify-between">

        <Link to={'/home'}><h1 className='text-4xl font-semibold'>Clover</h1></Link>

        <div className='flex items-center gap-5'>
            <Link to={'/profile'}>
                <CircleUserRound
                    size={36}
                />
            </Link>
            <button
                className='border p-1 rounded cursor-pointer hover:bg-white hover:text-red-800 transition'
                onClick={handleLogout}
            >
                Log Out
            </button>
        </div>
    </header>
  )
}

export default Header