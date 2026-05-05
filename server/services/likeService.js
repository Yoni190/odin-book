const { NotFoundError } = require("../lib/errors");
const { prisma } = require("../lib/prisma");


const fetchLikes = async (postId) => {
    const post = await prisma.post.findUnique({
        where: { id: postId }
    })

    if(!post) throw new NotFoundError('Post not found')
    
    const likes = await prisma.like.count({
        where: { postId }
    })

    return likes
}

module.exports = {
    fetchLikes
}