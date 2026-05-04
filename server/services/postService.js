const { prisma } = require('../lib/prisma')

const fetchPosts = async () => {
    const posts = await prisma.post.findMany({
        include: {
            author: {
                select: {
                    username: true
                }
            }
        }
    })

    return posts
}

const fetchPost = async (id) => {
    const post = await prisma.post.findUnique({
        where: { id },
        include: {
            author: {
                select: {
                    username: true
                }
            }
        }
    })

    return post
}

const createPost = async (content, authorId) => {
    await prisma.post.create({
        data: {
            content,
            authorId
        }
    })
}

const editPost = async (content, id, authorId) => {
    await prisma.post.update({
        where: { id, authorId },
        data: {
            content
        }
    })
}
module.exports = {
    fetchPosts,
    fetchPost,
    createPost,
    editPost
}