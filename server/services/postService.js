const { NotFoundError, ForbiddenError } = require('../lib/errors')
const { prisma } = require('../lib/prisma')


const fetchPosts = async () => {
    const posts = await prisma.post.findMany({
        include: {
            author: {
                select: {
                    username: true
                }
            },
            _count: {
                select: {
                    likes: true,
                    comments: true
                }
            },
            likes: true
        },
        orderBy: {
            createdAt: 'desc'
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

const fetchMyPosts = async (userId) => {
    const posts = await prisma.post.findMany({
        where: { authorId: userId },
        include: {
            author: {
                select: {
                    username: true
                }
            },
            _count: {
                select: {
                    likes: true,
                    comments: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    return posts
}

const createPost = async (content, authorId) => {
    const post = await prisma.post.create({
        data: {
            content,
            authorId
        }
    })

    return post
}

const editPost = async (content, id, authorId) => {
    const post = await prisma.post.findUnique({ where: { id } })

    if(!post) throw new NotFoundError('Post not found')
    if(post.authorId !== authorId) throw new ForbiddenError('Unauthorized access')
    
    await prisma.post.update({
        where: { id },
        data: {
            content
        }
    })
}

const deletePost = async (id, authorId) => {
    const post = await prisma.post.findUnique({ where: { id } })

    if(!post) throw new NotFoundError('Post not found')
    if(post.authorId !== authorId) throw new ForbiddenError('Unauthorized access')
    
    await prisma.post.delete({
        where: { id }
    })
}


module.exports = {
    fetchPosts,
    fetchPost,
    createPost,
    editPost,
    deletePost,
    fetchMyPosts
}