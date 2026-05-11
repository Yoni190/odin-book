import React from 'react'
import { Heart, MessageSquare } from 'lucide-react'
import Clover from '../components/Clover'


const Home = () => {

  const clovers = [
    {
      username: 'cool_username',
      posted: '1h',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto sint neque consequuntur, maiores earum eius, assumenda deleniti dolore minima quisquam beatae, suscipit cumque magni amet molestias laudantium sed mollitia nam.',
      likes: 20,
      comments: 30
    },
    {
      username: 'cool_username',
      posted: '1h',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto sint neque consequuntur, maiores earum eius, assumenda deleniti dolore minima quisquam beatae, suscipit cumque magni amet molestias laudantium sed mollitia nam.',
      likes: 20,
      comments: 30
    },
    {
      username: 'cool_username',
      posted: '1h',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto sint neque consequuntur, maiores earum eius, assumenda deleniti dolore minima quisquam beatae, suscipit cumque magni amet molestias laudantium sed mollitia nam.',
      likes: 20,
      comments: 30
    },
  ]

  return (
    <div className='p-4'>

      
      {clovers.map((clover, index) => (
        <Clover
          key={index}
          username={clover.username}
          posted={clover.posted}
          content={clover.content}
          likes={clover.likes}
          comments={clover.comments} />
      ))}
      
    </div>
  )
}

export default Home