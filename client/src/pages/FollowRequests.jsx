import React from 'react'
import apiClient from '../api/client'
import { useEffect } from 'react'


const FollowRequests = () => {
    useEffect(() => {
      const fetchFollowRequests = async () => {
        try {
            const res = await apiClient.get('/follows')

            console.log(res.data)
        } catch (error) {
            console.error(error)
        }
      }

      fetchFollowRequests()
    }, [])
    
  return (
    <div>FollowRequests</div>
  )
}

export default FollowRequests