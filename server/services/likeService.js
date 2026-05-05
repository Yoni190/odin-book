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

const createLike = async (postId, userId) => {
    const post = await prisma.post.findUnique({
        where: { id: postId }
    })

    if(!post) throw new NotFoundError('Post not found')
    
    const like = await prisma.like.create({
        data: {
            postId,
            userId
        }
    })

    return like
}

module.exports = {
    fetchLikes,
    createLike
}