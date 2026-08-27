import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import { Heart, MessageSquare, ArrowLeft, SendHorizonal } from 'lucide-react';
import axios from 'axios';
import Comment from '../components/Comment';
import formatDate from '../helpers/formatDate';

const CloverDetails = ({ userId }) => {
  const { id } = useParams();
  const [clover, setClover] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [user, setUser] = useState({})
  const [comments, setComments] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [comment, setComment] = useState('')

  const API_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchCloverDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/posts/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        const data = response.data.post;
        setClover(data);
        setLikesCount(data._count?.likes || 0);
        setComments(data.comments)
        
        console.log(data)
        // Match user ID structure correctly (checking if userId directly matches or matches a nested object property)
        const userHasLiked = data.likes?.some(like => 
          like.userId === user.id
        );
        setLiked(!!userHasLiked);
      } catch (error) {
        console.error("Error fetching clover details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchCloverDetails();
  }, [id, user, API_URL, token]);


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

    getUserData()
  }, [])
  

  const handleLikeToggle = async () => {
    try {
      // Optimistic UI updates
      const updatedLiked = !liked;
      setLiked(updatedLiked);
      setLikesCount(prev => updatedLiked ? prev + 1 : prev - 1);

      // Updated to use your configured Axios setup with API_URL and token
      await axios.post(`${API_URL}/posts/${id}/likes`, {}, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
    } catch (error) {
      // Revert UI changes on failure
      setLiked(!liked);
      setLikesCount(prev => !liked ? prev + 1 : prev - 1);
      console.error("Failed to toggle like:", error);
    }
  };

  const toggleCommentForm = () => {
    setShowForm(!showForm)
  }

  const handleComment = async () => {
    try {
      const res = await axios.post(`${API_URL}/posts/${id}/comments`, {
        content: comment
      },
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    } catch (error) {
      console.error(error.response.data)
    }
  }

  if (loading) return <div className="p-6 text-gray-500">Loading clover details...</div>;
  if (!clover) return <div className="p-6 text-red-500">Clover not found.</div>;

  return (
    // Removed max-w-2xl mx-auto so it spans the layout grid area smoothly
    <div className="w-full p-6 border-r border-zinc-200 min-h-screen bg-white">
      {/* Back Button */}
      <Link to="/home" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-800 mb-6 font-medium transition">
        <ArrowLeft size={18} />
        <span>Back to Home</span>
      </Link>

      {/* Main Clover Container */}
      <div className='p-4 border border-zinc-200 rounded-xl shadow-sm bg-zinc-50/50'>
        {/* Mirroring your Feed design header structure */}
        <h2 className='text-zinc-600 font-semibold mb-3'>
          @{clover.author?.username || clover.username} • <span className='text-sm text-zinc-400 font-normal'>{formatDate(clover.createdAt)}</span>
        </h2>
        
        <div className='flex flex-col gap-4'>
          <p className='text-zinc-800 text-lg leading-relaxed whitespace-pre-wrap'>{clover.content}</p>
          
          <div className="flex gap-4 mt-2">
            {/* Like Button */}
            <button 
              onClick={handleLikeToggle}
              className='flex gap-1 items-center hover:text-red-500 transition duration-300 hover:scale-[1.05] cursor-pointer text-zinc-500'
            >
              <Heart 
                size={20}
                fill={liked ? 'red' : 'transparent'}
                className={liked ? 'text-red-500' : ''}
              />
              <p className={liked ? 'text-red-500 font-medium' : ''}>{likesCount}</p>
            </button>

            {/* Comments Counter Display */}
            <button 
              onClick={toggleCommentForm}
              className='flex gap-1 items-center text-zinc-500 cursor-pointer'
            >
              <MessageSquare size={20} />
              <p>{clover.comments?.length || clover._count?.comments || 0}</p>
            </button>
          </div>
        </div>
      </div>

      {showForm && (
        <form 
          onSubmit={handleComment} 
          className="mt-4 flex flex-col sm:flex-row gap-2"
        >
          <textarea
            rows={3}
            name="comment"
            id="comment"
            placeholder="Write a comment…"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm 
                      focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                      outline-none transition resize-none"
          />
          <button
            type="submit"
            className="rounded-lg bg-red-600 px-6 py-2.5 text-sm font-medium 
                      text-white hover:bg-red-700 focus:ring-2 focus:ring-red-300 
                      transition disabled:opacity-50"
            disabled={!comment.trim()}
          >
            <SendHorizonal />
          </button>
        </form>
      )}
      

      {/* Comments Target Block */}
      <div className="mt-8">
        <h3 className="text-xl font-bold text-zinc-800 border-b pb-2 mb-4">Comments</h3>
        {comments.length == 0 ? (
          <p className="text-sm text-zinc-400 italic">No comments yet. Be the first to clover back!</p>
        ) : (
          <>
            {comments.map((comment, index) => (
              <Comment
                key={index}
                content={comment.content}
                username={comment.user.username}
                createdAt={comment.createdAt}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default CloverDetails;