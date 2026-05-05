const { NotFoundError } = require("../lib/errors")
const { fetchLikes } = require("../services/likeService")


const index = async (req, res) => {
    const id = parseInt(req.params.id)

    try {
        const likes = await fetchLikes(id)

        return res.json({ likes })
    } catch (error) {
        if(error instanceof NotFoundError) {
            return res.status(error.statusCode).json({ error: error.message })
        }

        return res.status(500).json({ error: 'Something went wrong' })
    }
}

module.exports = {
    index
}