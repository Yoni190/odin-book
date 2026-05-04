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

module.exports = {
    fetchPosts,
    fetchPost,
    createPost
}