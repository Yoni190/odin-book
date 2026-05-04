const { fetchPosts } = require('../services/postService')

const index = async (req, res) => {
    try {
        const posts = await fetchPosts()

        return res.json({ posts })
    } catch (error) {
        return res.status(500).json({ error: 'Something went wrong' })
    }
}

module.exports = {
    index
}