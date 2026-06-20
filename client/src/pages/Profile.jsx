import axios from 'axios'
import { format, formatDistanceToNow } from 'date-fns'
import React, { useEffect, useState } from 'react'
import Clover from '../components/Clover'





const Profile = () => {
  const token = localStorage.getItem('token')
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(false)
  const [posts, setPosts] = useState([])

  const API_URL = import.meta.env.VITE_API_URL
  useEffect(() => {
    const getUserData = async () => {
        setLoading(true)

        try {
            const res = await axios.get(`${API_URL}/profile`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            console.log(res.data.user)
            setUser(res.data.user)
        } catch (error) {
            console.error(error.response?.data)
        } finally {
            setLoading(false)
        }
    }

    const getUserPosts = async () => {
        try {
            const res = await axios.get(`${API_URL}/posts/me`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            console.log(res.data)
            setPosts(res.data.posts)
        } catch (error) {
            console.error(error.response?.data)
        }
    }

    getUserData()
    getUserPosts()
  }, [])

  const formatDate = (date) => {
      return formatDistanceToNow(new Date(date), {
        addSuffix: true
      })
    }
  
  return (
    <div>
        {loading ? (
            <div className='flex justify-center items-center min-h-screen'>
                <div className='w-5 h-5 border-2 border-t-transparent rounded-full animate-spin'></div>
            </div>
        ) : (
            <>
                {/* User Info Section */}
                <div className='p-5'>
                    <div className="flex justify-between">
                        <h1>@{user.username}</h1>
                        <p>
                            Joined on{' '}
                            {user.createdAt &&
                                format(new Date(user.createdAt), 'MMMM yyyy')}
                        </p>
                    </div>

                    <h2>Bio</h2>
                    <p>{user.bio ? user.bio : "You don't have a bio"}</p>

                    

                    <div className='flex gap-3'>
                        <h3>Followers {user._count?.followers}</h3>
                        <h3>Followings {user._count?.followings}</h3>
                    </div>
                </div>

                {/* User Posts */}
                {posts.map((post, index) => (
                    <Clover
                    key={post.id}
                    id={post.id}
                    username={post.author.username}
                    posted={formatDate(post.createdAt)}
                    content={post.content}
                    likesCount={post._count.likes}
                    likes={post.likes}
                    comments={post._count.comments} />
                ))}
            </>
        )}
        
    </div>
  )
}

export default Profile