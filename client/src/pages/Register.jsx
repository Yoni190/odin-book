import React from 'react'
import { Link } from 'react-router'
import LoginBG from '../assets/login_bg.png'
import GithubIcon from '../assets/github.png'

const Register = () => {
  return (
    <div className='flex justify-center bg-cover min-h-screen bg-center items-center py-5' style={{ backgroundImage: `url(${LoginBG})` }}>
        <form action="" className='flex flex-col w-1/3 border border-white/20 px-3 py-10 rounded-4xl items-center gap-5 shadow-xl bg-white/10 backdrop-blur-md text-white'>
            <div className='flex flex-col items-center gap-2 mb-2'>
                <h1 className='text-4xl font-bold tracking-wide'>
                    Clover
                </h1>
                <div className='flex flex-col items-center'>
                    <h2 className='text-2xl'>Create your account</h2>
                    <small className='text-gray-300'>Already have an account? <Link to={'/'} className='underline hover:text-white transition'>Log In</Link></small>
                </div>
            </div>

            <div className='flex flex-col w-2/3'>
                <label htmlFor="f_name">First Name</label>
                <input
                    type="text"
                    name="f_name"
                    id="f_name"
                    className='border border-white/20 bg-white/20 rounded-xl p-3 outline-none focus:ring-2 focus:ring-white transition'
                    placeholder='John' />
            </div>
            <div className='flex flex-col w-2/3'>
                <label htmlFor="l_name">Last Name</label>
                <input
                    type="text"
                    name="l_name"
                    id="l_name"
                    className='border border-white/20 bg-white/20 rounded-xl p-3 outline-none focus:ring-2 focus:ring-white transition'
                    placeholder='Doe' />
            </div>
            <div className='flex flex-col w-2/3'>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    className='border border-white/20 bg-white/20 rounded-xl p-3 outline-none focus:ring-2 focus:ring-white transition'
                    placeholder='cool@email.com' />
            </div>
            <div className='flex flex-col w-2/3'>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    name="username"
                    id="username"
                    className='border border-white/20 bg-white/20 rounded-xl p-3 outline-none focus:ring-2 focus:ring-white transition'
                    placeholder='coolest_username' />
            </div>

            <div className="flex flex-col w-2/3">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    autoComplete="new-password"
                    className='border border-gray-400 bg-white/20 rounded-xl p-3 outline-none focus:ring-2 focus:ring-white transition'
                    placeholder='totally hard to guess password' />
            </div>
            <div className="flex flex-col w-2/3">
                <label htmlFor="confirm">Confirm Password</label>
                <input
                    type="password"
                    name="confirm"
                    id="confirm"
                    className='border border-gray-400 bg-white/20 rounded-xl p-3 outline-none focus:ring-2 focus:ring-white transition'
                    placeholder="totally hard to guess password's twin" />
            </div>

            <button
            className='border border-white/50 w-2/3 rounded-4xl py-2 bg-white/10 cursor-pointer hover:bg-white/40 transition duration-300 hover:scale-[1.02]'>
                Register
            </button>
            <button
            className='border border-gray-400 w-2/3 rounded-4xl py-2 bg-white text-black cursor-pointer hover:bg-gray-100 transition duration-300 hover:scale-[1.02]'>
                Continue as guest
            </button>

            <div className="flex items-center w-1/2 gap-4">
                <div className="flex-1 h-px bg-gray-300"></div>

                <span className="text-sm text-gray-500 font-medium">
                    OR
                </span>

                <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            <button 
            className='border w-2/3 rounded-4xl flex justify-center items-center gap-5 py-2 bg-white text-black cursor-pointer hover:bg-gray-100 transition duration-300 hover:scale-[1.02]'>
                <img src={GithubIcon} alt="github icon" width={35}/>
                <p>Continue using GitHub</p>
            </button>
        </form>
    </div>
  )
}

export default Register