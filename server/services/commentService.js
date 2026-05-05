const { NotFoundError, ForbiddenError } = require("../lib/errors");
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

const deleteComment = async (commentId, userId) => {
    const comment = await prisma.comment.findUnique({
        where: { id: commentId }
    })

    if(!comment) throw new NotFoundError('Comment not found')
    if(comment.userId !== userId) throw new ForbiddenError('Unauthorized access')
    
    await prisma.comment.delete({
        where: { id: commentId }
    })
}

module.exports = {
    fetchComments,
    createComment,
    deleteComment
}