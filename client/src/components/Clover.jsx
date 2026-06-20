import { Heart, MessageSquare } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'


const Clover = ({ id, username, posted, content, likesCount, likes, comments, toggleLike, userId }) => {

  const [liked, setLiked] = useState(false)
  const [count, setCount] = useState(likesCount)

  useEffect(() => {
    const userHasLiked = likes?.some(like => like.userId === userId)
    setLiked(!!userHasLiked)
  }, [likes, userId])

  const handleLikeClick = async () => {
    const updatedLiked = !liked
    setLiked(updatedLiked)
    setCount(prev => updatedLiked ? prev + 1 : prev - 1)

    try {
      await toggleLike(id)
    } catch (error) {
      // revert UI if the API call fails
      setLiked(!updatedLiked)
      setCount(prev => updatedLiked ? prev - 1 : prev + 1)
      console.error('Failed to toggle like:', error)
    }
  }

  return (
    <div className='border-b p-2'>
        <h2>@{username} . {posted}</h2>
        <div className='flex flex-col gap-3'>
            <p>{content}</p>
            
            <div className="flex gap-3">

            <div 
              onClick={handleLikeClick}
              className='flex gap-1 items-center hover:text-red-400 transition duration-300 hover:scale-[1.05] cursor-pointer'
            >
                <Heart 
                  fill={liked ? 'red' : 'transparent'}
                  className={liked ? 'text-red-500' : ''}
                  />
                <p className={liked ? 'text-red-500 font-medium' : ''}>{count}</p>
            </div>

            <Link to={`/clover/${id}`} className='flex gap-1 hover:text-blue-400 transition duration-300 hover:scale-[1.05] cursor-pointer'>
                <MessageSquare />
                <p>{comments}</p>
            </Link>
            </div>
        </div>


    </div>
  )
}

export default Clover