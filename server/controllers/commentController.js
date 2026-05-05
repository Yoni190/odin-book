const { NotFoundError } = require("../lib/errors")
const { fetchComments } = require("../services/commentService")



const index = async (req, res) => {
    const postId = parseInt(req.params.id)

    try {
        const comments = await fetchComments(postId)

        return res.json({ comments })
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