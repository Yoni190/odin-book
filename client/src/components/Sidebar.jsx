import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'

const Sidebar = () => {
    const [search, setSearch] = useState('')
    const [users, setUsers] = useState([])

    const API_URL = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem('token');

    // const handleSearch = (e) => {
    //     e.preventDefault()

    //     console.log(search)
    // }

    useEffect(() => {
      const getUsers = async () => {
        try {
            const res = await axios.get(`${API_URL}/users`, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            setUsers(res.data)
        } catch (error) {
            console.error(error)
        }
      }

      getUsers()
    }, [])

    const handleFollow = async (id) => {
        console.log('followed', id)
        try {
            const res = await axios.post(`${API_URL}/follows/${id}`, null, {
                headers: { 'Authorization': `Bearer ${token}` }
            })

            console.log(res)
        } catch (error) {
            console.error(error)
        }
    }
    
  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-8">
        <div className="mx-auto max-w-4xl">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
                Users
            </h2>
            <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700">
                {users.length} total
            </span>
            </div>

            {/* User list */}
            {users.length === 0 ? (
            <div className="rounded-xl border-2 border-dashed border-gray-200 p-12 text-center">
                <p className="text-gray-500">No users found</p>
            </div>
            ) : (
            <ul className="space-y-3">
                {users.map((user) => (
                <li
                    key={user.id}
                    className="group flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm transition-shadow duration-200 hover:shadow-md"
                >
                    {/* Avatar placeholder */}
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-red-800 text-sm font-medium uppercase text-white">
                    {user.username.charAt(0)}
                    </div>

                    {/* User info */}
                    <div className="flex flex-1 flex-col min-w-0">
                    <span className="truncate font-medium text-gray-900">
                        {user.username}
                    </span>

                    <button onClick={() => handleFollow(user.id)}>
                        Follow
                    </button>
                    </div>
                </li>
                ))}
            </ul>
            )}
        </div>
    </div>
  )
}

export default Sidebar