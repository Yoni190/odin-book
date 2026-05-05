const { NotFoundError } = require("../lib/errors");
const { prisma } = require("../lib/prisma");


const fetchComments = async (postId) => {
    const post = await prisma.post.findUnique({
        where: { id: postId }
    })

    if(!post) throw new NotFoundError('Post not found')
    
    const comments = await prisma.comment.findMany({
        where: { postId }
    })

    return comments
}

const createComment = async(postId, userId, content) => {
    const post = await prisma.post.findUnique({
        where: { id: postId }
    })

    if(!post) throw new NotFoundError('Post not found')

    const comment = await prisma.comment.create({
        data: {
            postId,
            userId,
            content
        }
    })

    return comment
}


module.exports = {
    fetchComments,
    createComment
}