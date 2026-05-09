import React, { useState } from 'react'
import { Link } from 'react-router'
import LoginBG from '../assets/login_bg.png'
import GithubIcon from '../assets/github.png'
import axios from 'axios'

const Login = () => {
    const API_URL = import.meta.env.VITE_API_URL
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })
    const [loading, setLoading] = useState(false)

    const [errors, setErrors] = useState({})

    const handleLogin = async (e) => {
        e.preventDefault()

        const newErrors = {}
        if(!formData.username) {
            newErrors.username = 'Enter your username'
        } if(!formData.password) {
            newErrors.password = 'Enter your password'
        }

        if(Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        setErrors({})
        setLoading(true)

        try {
            const res = await axios.post(`${API_URL}/auth/login`, formData)

            localStorage.setItem('token', res.data.accessToken)
        } catch (error) {
            console.error(error)
            setErrors(error.response.data)
        } finally {
            setLoading(false)
        }
    }

  return (
    <div className='flex justify-center bg-cover min-h-screen bg-center items-center' style={{ backgroundImage: `url(${LoginBG})` }}>
        <form onSubmit={handleLogin} className='flex flex-col w-1/3 border border-white/20 px-3 py-10 rounded-4xl items-center gap-5 shadow-xl bg-white/10 backdrop-blur-md text-white'>
            <div className='flex flex-col items-center gap-2 mb-2'>
                <h1 className='text-4xl font-bold tracking-wide'>
                    Clover
                </h1>
                <div className='flex flex-col items-center'>
                    <h2 className='text-2xl'>Sign in to your account</h2>
                    <small className='text-gray-300'>Don't have an account? <Link to={'/register'} className='underline hover:text-white transition'>Sign Up</Link></small>
                </div>
            </div>

            <div className='flex flex-col w-2/3'>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    name="username"
                    id="username"
                    className='border border-white/20 bg-white/20 rounded-xl p-3 outline-none focus:ring-2 focus:ring-white transition'
                    placeholder='coolest_username'
                    value={formData.username}
                    onChange={(e) => setFormData({...formData, username: e.target.value})} />
                    {errors.username && (
                        <div>
                            <p>{errors.username}</p>
                        </div>
                    )}
            </div>

            <div className="flex flex-col w-2/3">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    className='border border-gray-400 bg-white/20 rounded-xl p-3 outline-none focus:ring-2 focus:ring-white transition'
                    placeholder='totally hard to guess password'
                    value={formData.password}
                    autoComplete='new-password'
                    onChange={(e) => setFormData({...formData, password: e.target.value})} />
                    {errors.password && (
                        <div>
                            <p>{errors.password}</p>
                        </div>
                    )}
            </div>

            <button
            disabled={loading}
            className='border border-white/50 w-2/3 rounded-4xl py-2 bg-white/10 cursor-pointer hover:bg-white/40 transition duration-300 hover:scale-[1.02]'>
                {loading ? (
                    <div className='flex justify-center'>
                        <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                    </div>
                ) : (
                    'Log In'
                )}
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

export default Login