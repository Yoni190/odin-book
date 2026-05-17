import { Heart, MessageSquare } from 'lucide-react'
import React from 'react'


const Clover = ({ username, posted, content, likes, comments, likePost}) => {
  return (
    <div className='border-b p-2'>
        <h2>@{username} . {posted}</h2>
        <div className='flex flex-col gap-3'>
            <p>{content}</p>
            
            <div className="flex gap-3">

            <div className='flex gap-1 hover:text-red-400 transition duration-300 hover:scale-[1.05] cursor-pointer'>
                <Heart 
                  onClick={likePost}
                  />
                <p>{likes}</p>
            </div>

            <div className='flex gap-1 hover:text-blue-400 transition duration-300 hover:scale-[1.05] cursor-pointer'>
                <MessageSquare />
                <p>{comments}</p>
            </div>
            </div>
        </div>


    </div>
  )
}

export default Clover