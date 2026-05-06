const { prisma } = require("../lib/prisma");


const fetchUserFollows = async (userId) => {
    const follows = await prisma.follow.count({
        where: { followingId: userId }
    })

    return follows
}

module.exports = {
    fetchUserFollows
}