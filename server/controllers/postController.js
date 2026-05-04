const { NotFoundError, ForbiddenError } = require('../lib/errors')
const { fetchPosts, fetchPost, createPost, editPost, deletePost } = require('../services/postService')


const index = async (req, res) => {
    try {
        const posts = await fetchPosts()

        return res.json({ posts })
    } catch (error) {
        return res.status(500).json({ error: 'Something went wrong' })
    }
}

const post = async (req, res) => {
    const id = parseInt(req.params.id)
    try {
        const post = await fetchPost(id)

        if(!post) return res.status(404).json({ error: 'Post not found' })

        return res.json({ post })
    } catch (error) {
        return res.status(500).json({ error: 'Something went wrong' })
    }
}

const store = async (req, res) => {
    const { content } = req.body
    const authorId = req.user.id

    try {
        const post = await createPost(content, authorId)

        return res.status(201).json({ post })
    } catch (error) {
        return res.status(500).json({ error: 'Something went wrong' })
    }
}

const update = async (req, res) => {
    const { content } = req.body
    const id = parseInt(req.params.id)
    const authorId = req.user.id

    try {
        await editPost(content, id, authorId)

        return res.json({ message: 'Post edited successfully' })
    } catch (error) {
        if(error instanceof NotFoundError || error instanceof ForbiddenError) {
            return res.status(error.statusCode).json({ error: error.message })
        }
        return res.status(500).json({ error: 'Something went wrong' })
    }
}

const destroy = async (req, res) => {
    const id = parseInt(req.params.id)
    const authorId = req.user.id

    try {
        await deletePost(id, authorId)

        return res.json({ message: 'Post deleted successfully' })
    } catch (error) {
        return res.status(500).json({ error: 'Something went wrong' })
    }
}

module.exports = {
    index,
    post,
    store,
    update,
    destroy
}