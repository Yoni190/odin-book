const { fetchPosts, fetchPost, createPost } = require('../services/postService')

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

        return res.json({ post })
    } catch (error) {
        return res.status(500).json({ error: 'Something went wrong' })
    }
}

const store = async (req, res) => {
    const { content } = req.body
    const authorId = req.user.id

    try {
        await createPost(content, authorId)

        return res.json({ message: 'Post created successfully' })
    } catch (error) {
        return res.status(500).json({ error: 'Something went wrong' })
    }
}

module.exports = {
    index,
    post,
    store
}