import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import apiClient from '../api/client'
import { useNavigate } from 'react-router'


const EditProfile = () => {
  const [user, setUser] = useState({
    fName: '',
    lName: '',
    username: '',
    email: ''
  })

  const navigate = useNavigate()

  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await apiClient.get('/profile')
        console.log(res.data.user)

        setUser(res.data.user)
      } catch (error) {
        console.error(error)
      }
    }

    getProfile()
  }, [])


  const handleEditProfile = async (e) => {
    e.preventDefault()

    try {
      const res = await apiClient.put('/profile', user)
      console.log(res)
      navigate('/profile')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <h1 className="text-2xl font-semibold text-slate-900 mb-1">Edit profile</h1>
          <p className="text-sm text-slate-500 mb-6">Update your personal details below.</p>

          <form onSubmit={(e) => handleEditProfile(e)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="fName" className="block text-sm font-medium text-slate-700 mb-1">
                  First name
                </label>
                <input
                  type="text"
                  name="fName"
                  id="fName"
                  value={user.fName}
                  onChange={(e) => setUser({ ...user, fName: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="lName" className="block text-sm font-medium text-slate-700 mb-1">
                  Last name
                </label>
                <input
                  type="text"
                  name="lName"
                  id="lName"
                  value={user.lName}
                  onChange={(e) => setUser({ ...user, lName: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-slate-700 mb-1">
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg px-4 py-2.5 transition-colors"
            >
              Save changes
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditProfile