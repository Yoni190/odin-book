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

const toggleLike = async (postId, userId) => {
    const post = await prisma.post.findUnique({
        where: { id: postId }
    })

    if(!post) throw new NotFoundError('Post not found')

    const existingLike = await prisma.like.findUnique({
        where: {
            userId_postId: {
                postId: postId,
                userId: userId
            }
        }
    })

    if(existingLike) {
        await prisma.like.delete({
            where: {
                userId_postId: {
                    postId,
                    userId
                }
            }
        })

        return { liked: false }
    } else {
        const like = await prisma.like.create({
            data: {
                postId,
                userId
            }
        })

        return { liked: true, like }
    }
    
}

const deleteLike = async (postId, userId) => {
    const like = await prisma.like.findUnique({
        where: {
            userId_postId: { userId, postId }
        }
    })


    if(!like) throw new NotFoundError('Like not found')

    await prisma.like.delete({
        where: {
            userId_postId: { userId, postId }
        }
    })
}

const fetchLike = async (likeId) => {
    const like = await prisma.like.findUnique({
        where: { id: likeId }
    })

    return like
}

module.exports = {
    fetchLikes,
    toggleLike,
    deleteLike,
    fetchLike
}