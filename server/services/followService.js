const { NotFoundError } = require("../lib/errors");
const { prisma } = require("../lib/prisma");
const { AppError } = require('../utils/errors')

const fetchUserFollowers = async(userId) => {
    const followers = await prisma.follow.findMany({
        where: { followingId: userId, status: 'ACCEPTED' },
        include: {
            follower: {
                select: {
                    id: true,
                    username: true
                }
            }
        }
    })

    if(!followers) {
        throw new AppError('Follow request not found', 404)
    }

    return followers
}

const fetchUserFollowRequests = async (userId) => {
    const follows = await prisma.follow.findMany({
        where: { followingId: userId },
        include: {
            follower: {
                select: {
                    id: true,
                    username: true
                }
            }
        }
    })
    const followCount = await prisma.follow.count({
        where: { followingId: userId }
    })

    return {follows, followCount}
}

const createFollow = async (followerId, followingId) => {
    const user = await prisma.user.findUnique({
        where: { id: followingId }
    })

    if(!user) throw new NotFoundError('User not found')
    
    const follow = await prisma.follow.create({
        data: {
            followerId, followingId
        }
    })

    return follow
}

const deleteFollow = async (followerId, followingId) => {
    const user = await prisma.user.findUnique({
        where: { id: followingId }
    })

    if(!user) throw new NotFoundError('User not found')
    
    await prisma.follow.delete({
        where: {
            followerId_followingId: {
                followerId, followingId
            }
        }
    })
}

const updateFollowRequest = async(id, userId, status) => {
    const follow = await prisma.follow.findUnique({
        where: { id }
    })

    if(!follow) {
        throw new AppError('Follow request not found', 404)
    }
    
    if(follow.followingId !== userId) {
        throw new AppError('You are not authorized to act on this request', 403)
    }

    if (follow.status !== 'PENDING') {
        throw new AppError('Follow request already processes', 400)
    }

    const updated = await prisma.follow.update({
        where: { id },
        data: { status },
    });

    return updated
}


module.exports = {
    fetchUserFollowRequests,
    createFollow,
    deleteFollow,
    updateFollowRequest,
    fetchUserFollowers
}