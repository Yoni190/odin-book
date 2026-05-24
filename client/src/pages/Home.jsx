import React, { useEffect, useState } from 'react'
import { Heart, MessageSquare } from 'lucide-react'
import Clover from '../components/Clover'
import axios from 'axios'
import { formatDistanceToNow } from 'date-fns'
import getUserIdFromToken from '../helpers/getUserId'




const Home = () => {
  const [clovers, setClovers] = useState([])
  const [clover, setClover] = useState('')
  const token = localStorage.getItem('token')
  const [error, setError] = useState('')
  const [userId, setUserId] = useState('')


  const API_URL = import.meta.env.VITE_API_URL

  // const clovers = [
  //   {
  //     username: 'cool_username',
  //     posted: '1h',
  //     content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto sint neque consequuntur, maiores earum eius, assumenda deleniti dolore minima quisquam beatae, suscipit cumque magni amet molestias laudantium sed mollitia nam.',
  //     likes: 20,
  //     comments: 30
  //   },
  //   {
  //     username: 'cool_username',
  //     posted: '1h',
  //     content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto sint neque consequuntur, maiores earum eius, assumenda deleniti dolore minima quisquam beatae, suscipit cumque magni amet molestias laudantium sed mollitia nam.',
  //     likes: 20,
  //     comments: 30
  //   },
  //   {
  //     username: 'cool_username',
  //     posted: '1h',
  //     content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto sint neque consequuntur, maiores earum eius, assumenda deleniti dolore minima quisquam beatae, suscipit cumque magni amet molestias laudantium sed mollitia nam.',
  //     likes: 20,
  //     comments: 30
  //   },
  // ]

  useEffect(() => {
    const getClovers = async () => {
      try {
        const res = await axios.get(`${API_URL}/posts`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        console.log(res.data.posts)
        setClovers(res.data.posts)

      } catch (error) {
        console.error(error)
      }
    }

    const userId = getUserIdFromToken()

    setUserId(userId)
    

    getClovers()
  }, [])
  

  const formatDate = (date) => {
    return formatDistanceToNow(new Date(date), {
      addSuffix: true
    })
  }


  const likePost = async (id) => {
    try {
      const res = await axios.post(`${API_URL}/posts/${id}/likes`, null, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      console.log(res.data)
    } catch (error) {
      console.error(error.response)
    }
  }

  const postClover = async (e) => {
    if (!clover) {
      e.preventDefault()
      setError('Clover cannot be empty!')
      return
    }

    

    try {
      const res = await axios.post(`${API_URL}/posts`,
        {
          content: clover
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      )

      console.log(res)
    } catch (error) {
      console.error(error.response?.data)
      setError(error.response?.data.content)
    }
  }
  return (
    <div className='p-4'>

      <form onSubmit={postClover} className='grid grid-cols-1'>
        <input
          type="text"
          name="content"
          id="content"
          placeholder="What's on your thought?"
          className='p-4 outline-none'
          value={clover}
          onChange={(e) => setClover(e.target.value)} />

          <div className='flex justify-end'>
            <button className='border rounded-xl px-3 py-1 cursor-pointer hover:bg-red-800 hover:text-white transition duration-300'>
              Post
            </button>
          </div>

          {error && (
            <div>
              <p className='text-red-500'>{error}</p>
            </div>
          )}
      </form>

      
      {clovers.map((clover, index) => (
        <Clover
          key={clover.id}
          username={clover.author.username}
          posted={formatDate(clover.createdAt)}
          content={clover.content}
          likesCount={clover._count.likes}
          likes={clover.likes}
          comments={clover._count.comments} 
          likePost={() => likePost(clover.id)}
          userId={userId}/>
      ))}
      
    </div>
  )
}

export default Home