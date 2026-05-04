const { prisma } = require('../lib/prisma')

const fetchPosts = async () => {
    const posts = await prisma.post.findMany({})

    return posts
}

const fetchPost = async (id) => {
    const post = await prisma.post.findUnique({
        where: { id }
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