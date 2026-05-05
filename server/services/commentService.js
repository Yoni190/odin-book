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
}


module.exports = {
    fetchComments
}