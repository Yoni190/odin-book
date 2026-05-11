import React, { useEffect, useState } from 'react'
import { Heart, MessageSquare } from 'lucide-react'
import Clover from '../components/Clover'
import axios from 'axios'
import { formatDistanceToNow } from 'date-fns'



const Home = () => {
  const [clovers, setClovers] = useState([])
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
        const token = localStorage.getItem('token')
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

    getClovers()
  }, [])
  

  const formatDate = (date) => {
    return formatDistanceToNow(new Date(date), {
      addSuffix: true
    })
  }
  return (
    <div className='p-4'>

      
      {clovers.map((clover, index) => (
        <Clover
          key={clover.id}
          username={clover.author.username}
          posted={formatDate(clover.createdAt)}
          content={clover.content}
          likes={clover._count.likes}
          comments={clover._count.comments} />
      ))}
      
    </div>
  )
}

export default Home