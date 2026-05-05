const { NotFoundError } = require("../lib/errors")
const { fetchLikes, createLike } = require("../services/likeService")


const index = async (req, res) => {
    const postId = parseInt(req.params.id)

    try {
        const likes = await fetchLikes(postId)

        return res.json({ likes })
    } catch (error) {
        if(error instanceof NotFoundError) {
            return res.status(error.statusCode).json({ error: error.message })
        }

        return res.status(500).json({ error: 'Something went wrong' })
    }
}

const store = async (req, res) => {
    const postId = parseInt(req.params.id)
    const userId = req.user.id

    try {
        const like = await createLike(postId, userId)

        return res.status(201).json({ like })
    } catch (error) {
        if(error instanceof NotFoundError) {
            return res.status(error.statusCode).json({ error: error.message })
        }

        return res.status(500).json({ error: 'Something went wrong' })
    }
}

module.exports = {
    index,
    store
}