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

module.exports = {
    fetchPosts,
    fetchPost
}