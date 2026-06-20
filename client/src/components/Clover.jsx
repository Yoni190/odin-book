import axios from 'axios'
import { Heart, MessageSquare } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'

const Clover = ({ id, username, posted, content, likesCount, likes, comments, userId }) => {

  const [liked, setLiked] = useState(false)
  const [count, setCount] = useState(likesCount)
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  const API_URL = import.meta.env.VITE_API_URL

  useEffect(() => {
    const userHasLiked = likes?.some(like => like.userId === userId)
    setLiked(!!userHasLiked)
  }, [likes, userId])

  const toggleLike = async (id) => {
    try {
      await axios.post(`${API_URL}/posts/${id}/likes`, null, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
    } catch (error) {
      console.error(error)
    }
  }

  const handleLikeClick = async (e) => {
    e.stopPropagation()
    const updatedLiked = !liked
    setLiked(updatedLiked)
    setCount(prev => updatedLiked ? prev + 1 : prev - 1)

    try {
      await toggleLike(id)
    } catch (error) {
      setLiked(!updatedLiked)
      setCount(prev => updatedLiked ? prev - 1 : prev + 1)
      console.error('Failed to toggle like:', error)
    }
  }

  return (
    <article
      onClick={() => navigate(`/clover/${id}`)}
      className='p-5 border-b border-zinc-200 hover:bg-zinc-50/80 transition-colors cursor-pointer'
    >
      <div className='flex gap-3'>
        <div className='shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-red-700 to-red-900 text-white flex items-center justify-center font-semibold text-sm'>
          {username?.[0]?.toUpperCase()}
        </div>

        <div className='flex flex-col gap-2 min-w-0 flex-1'>
          <h2 className='text-zinc-900'>
            <span className='font-semibold'>@{username}</span>
            <span className='text-zinc-400 font-normal text-sm'> · {posted}</span>
          </h2>

          <p className='text-zinc-700 leading-relaxed whitespace-pre-wrap break-words'>{content}</p>

          <div className='flex gap-2 mt-1 -ml-2'>
            <button
              type='button'
              onClick={handleLikeClick}
              className='flex items-center gap-1.5 px-2 py-1 rounded-full text-zinc-500 hover:bg-red-50 hover:text-red-600 transition-colors'
            >
              <Heart
                size={18}
                fill={liked ? 'currentColor' : 'transparent'}
                className={`transition-transform ${liked ? 'text-red-600 scale-110' : ''}`}
              />
              <span className={`text-sm ${liked ? 'text-red-600 font-medium' : ''}`}>{count}</span>
            </button>

            <Link
              to={`/clover/${id}`}
              onClick={(e) => e.stopPropagation()}
              className='flex items-center gap-1.5 px-2 py-1 rounded-full text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800 transition-colors'
            >
              <MessageSquare size={18} />
              <span className='text-sm'>{comments}</span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}

export default Clover