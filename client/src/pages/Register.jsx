import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import LoginBG from '../assets/login_bg.png'
import GithubIcon from '../assets/github.png'
import axios from 'axios'

const Register = () => {
    const API_URL = import.meta.env.VITE_API_URL
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        fName: '',
        lName: '',
        email: '',
        username: '',
        password: '',
        confirm: ''
    })

    const [errors, setErrors] = useState({})

    const handleRegister = async (e) => {
        e.preventDefault()

        const newErrors = {}
        if(!formData.fName) {
            newErrors.fName = 'Enter your first name'
        } if(!formData.lName) {
            newErrors.lName = 'Enter your last name'
        } if(!formData.email) {
            newErrors.email = 'Enter your email'
        } if(!formData.username) {
            newErrors.username = 'Enter your username'
        } if(!formData.password) {
            newErrors.password = 'Enter your password'
        } if(!formData.confirm) {
            newErrors.confirm = 'Reenter your password'
        } if(formData.password !== formData.confirm) {
            newErrors.confirm = 'Password and confirm password must match'
        }

        if(Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        setErrors({})

        try {
            const res = await axios.post(`${API_URL}/auth/register`, formData)

            console.log(res)
            if(res.status === 200) {
                navigate('/')
            }
        } catch (error) {
            console.error(error)
            setErrors(error.response.data)
        }
    }
  return (
    <div className='flex justify-center bg-cover min-h-screen bg-center items-center py-5' style={{ backgroundImage: `url(${LoginBG})` }}>
        <form onSubmit={handleRegister} className='flex flex-col w-1/3 border border-white/20 px-3 py-10 rounded-4xl items-center gap-5 shadow-xl bg-white/10 backdrop-blur-md text-white'>
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
                <label htmlFor="fName">First Name</label>
                <input
                    type="text"
                    name="fName"
                    id="fName"
                    className='border border-white/20 bg-white/20 rounded-xl p-3 outline-none focus:ring-2 focus:ring-white transition'
                    placeholder='John'
                    value={formData.fName}
                    onChange={(e) => setFormData({...formData, fName: e.target.value })} />
                    {errors.fName && (
                        <div>
                            <p>{errors.fName}</p>
                        </div>
                    )}
            </div>
            
            <div className='flex flex-col w-2/3'>
                <label htmlFor="lName">Last Name</label>
                <input
                    type="text"
                    name="lName"
                    id="lName"
                    className='border border-white/20 bg-white/20 rounded-xl p-3 outline-none focus:ring-2 focus:ring-white transition'
                    placeholder='Doe'
                    value={formData.lName}
                    onChange={(e) => setFormData({...formData, lName: e.target.value })} />
                    {errors.lName && (
                        <div>
                            <p>{errors.lName}</p>
                        </div>
                    )}
            </div>
            <div className='flex flex-col w-2/3'>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    className='border border-white/20 bg-white/20 rounded-xl p-3 outline-none focus:ring-2 focus:ring-white transition'
                    placeholder='cool@email.com'
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value })} />
                    {errors.email && (
                        <div>
                            <p>{errors.email}</p>
                        </div>
                    )}
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
                    onChange={(e) => setFormData({...formData, username: e.target.value })} />
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
                    autoComplete="new-password"
                    className='border border-gray-400 bg-white/20 rounded-xl p-3 outline-none focus:ring-2 focus:ring-white transition'
                    placeholder='totally hard to guess password'
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value })} />
                    {errors.password && (
                        <div>
                            <p>{errors.password}</p>
                        </div>
                    )}
            </div>
            <div className="flex flex-col w-2/3">
                <label htmlFor="confirm">Confirm Password</label>
                <input
                    type="password"
                    name="confirm"
                    id="confirm"
                    className='border border-gray-400 bg-white/20 rounded-xl p-3 outline-none focus:ring-2 focus:ring-white transition'
                    placeholder="totally hard to guess password's twin"
                    value={formData.confirm}
                    onChange={(e) => setFormData({...formData, confirm: e.target.value })} />
                    {errors.confirm && (
                        <div>
                            <p>{errors.confirm}</p>
                        </div>
                    )}
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