const { NotFoundError } = require("../lib/errors");
const { prisma } = require("../lib/prisma");


const fetchUserFollows = async (userId) => {
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

module.exports = {
    fetchUserFollows,
    createFollow,
    deleteFollow
}