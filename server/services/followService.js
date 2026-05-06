const { NotFoundError } = require("../lib/errors");
const { prisma } = require("../lib/prisma");


const fetchUserFollows = async (userId) => {
    const follows = await prisma.follow.count({
        where: { followingId: userId }
    })

    return follows
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

module.exports = {
    fetchUserFollows,
    createFollow
}