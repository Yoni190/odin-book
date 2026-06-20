import { Heart, MessageSquare } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'


const Clover = ({ id, username, posted, content, likesCount, likes, comments, toggleLike, userId}) => {

  const [liked, setLiked] = useState(false)

  useEffect(() => {
    console.log(likes)
    console.log(likes.userId)
    if(likes.userId === userId) {
      setLiked(true)
    }
  }, [])
  
  
  return (
    <div className='border-b p-2'>
        <h2>@{username} . {posted}</h2>
        <div className='flex flex-col gap-3'>
            <p>{content}</p>
            
            <div className="flex gap-3">

            <div className='flex gap-1 hover:text-red-400 transition duration-300 hover:scale-[1.05] cursor-pointer'>
                <Heart 
                  onClick={toggleLike}
                  fill={liked ? 'red' : 'white'}
                  />
                <p>{likesCount}</p>
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