import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import apiClient from '../api/client'



const Followers = () => {
    const [followers, setFollowers] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchFollowers = async () => {
        try {
            setLoading(true);
            const res = await apiClient.get('/follows/me/followers')

            setFollowers(res.data)
            setError(null);
        } catch (err) {
            setError("Failed to load followers. Please try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
      }

      fetchFollowers()
    }, [])

     if (loading) {
        return (
        <div className="flex justify-center py-8">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
        );
    }

    if (error) {
        return (
        <div className="text-center py-8 text-red-600">
            <p>{error}</p>
            <button
            onClick={() => window.location.reload()}
            className="mt-2 text-sm underline hover:no-underline"
            >
            Retry
            </button>
        </div>
        );
    }
    
    if (followers.length === 0) {
        return (
        <div className="text-center py-8 text-gray-500">
            <p>You don’t have any followers yet.</p>
        </div>
        );
    }

  return (
    <div className="max-w-2xl px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Followers</h1>
      <ul className="space-y-3">
        {followers.map((follower) => (
          <li
            key={follower.id}
            className="flex items-center gap-4 p-3 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 bg-red-200 rounded-full flex items-center justify-center text-gray-600 font-semibold">
              {follower.following?.username?.charAt(0).toUpperCase() || "?"}
            </div>
            <div>
              <p className="font-medium text-gray-800">
                {follower.following?.username || "Unknown user"}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Followers