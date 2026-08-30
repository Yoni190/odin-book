import React from 'react'
import apiClient from '../api/client'
import { useEffect } from 'react'
import { useState } from 'react'
import formatDate from '../helpers/formatDate'

const FollowRequests = () => {
    const [follows, setFollows] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchFollowRequests = async () => {
        setLoading(true)
        try {
            const res = await apiClient.get('/follows/requests')
            setFollows(res.data.follows || [])
        } catch (error) {
            setError('Failed to load follow requests');
            console.error(err);
        } finally {
            setLoading(false);
        }
      }

      fetchFollowRequests()
    }, [])

    const handleStatusUpdate = async (id, newStatus) => {
        setFollows(prev =>
            prev.map(follow =>
                follow.id === id ? { ...follow, status: newStatus } : follow
            )
        )
        try {
            const res = await apiClient.patch(`/follows/${id}`, {
                status: newStatus
            })

            console.log(res.data.follow)
        } catch (error) {
            setFollows(prev =>
                prev.map(follow =>
                    follow.id === id ? { ...follow, status: 'PENDING' } : follow
                )
            )
            console.error(error)
        }
    }
    
    if (loading) {
        return (
        <div className="flex justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
        </div>
        );
    }

    if (error) {
        return <p className="py-8 text-center text-red-500">{error}</p>;
    }
    return (
        <div className="mx-auto max-w-2xl p-4">
        <h1 className="mb-6 text-2xl font-bold tracking-tight text-gray-900">
            Follow Requests
            {follows.length > 0 && (
            <span className="ml-2 rounded-full bg-red-100 px-2.5 py-0.5 text-sm font-medium text-red-800">
                {follows.length}
            </span>
            )}
        </h1>

        {follows.length === 0 ? (
            <div className="rounded-xl border-2 border-dashed border-gray-200 py-12 text-center">
            <p className="text-gray-500">No pending requests</p>
            <p className="mt-1 text-sm text-gray-400">
                When someone follows you, they'll show up here
            </p>
            </div>
        ) : (
            <ul className="space-y-3">
            {follows.map((follow) => {
                // Safe fallback in case follower data is missing
                const user = follow.follower || { username: 'Unknown user' };
                return (
                <li
                    key={follow.id}
                    className="flex flex-col gap-3 rounded-xl bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
                >
                    <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-red-800 text-sm font-medium uppercase text-white">
                        {user.username?.charAt(0) || '?'}
                    </div>

                    <div className="min-w-0 flex-1">
                        <p className="truncate font-medium text-gray-900">
                        {user.username}
                        </p>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500">
                        <span className="capitalize">{follow.status}</span>
                        <span className="hidden sm:inline">·</span>
                        <span>{formatDate(follow.createdAt)}</span>
                        </div>
                    </div>
                    </div>

                    <div className="flex shrink-0 gap-2 self-end sm:self-auto">
                    {follow.status == 'PENDING' && (
                        <>
                            <button
                                onClick={() => handleStatusUpdate(follow.id, 'ACCEPTED')}
                                className="rounded-lg bg-red-600 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Accept
                            </button>
                            <button
                                onClick={() => handleStatusUpdate(follow.id, 'REJECTED')}
                                className="rounded-lg bg-gray-100 px-4 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                            >
                                Reject
                            </button>
                        </>
                    )}
                    
                    </div>
                </li>
                );
            })}
            </ul>
        )}
        </div>
    );
};

export default FollowRequests;