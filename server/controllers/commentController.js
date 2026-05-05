const { NotFoundError } = require("../lib/errors")
const { fetchComments, createComment, deleteComment } = require("../services/commentService")



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

const store = async (req, res) => {
    const postId = parseInt(req.params.id)
    const userId = req.user.id
    const { content } = req.body

    try {
        const comment = await createComment(postId, userId, content)

        return res.status(201).json({ comment })
    } catch (error) {
        if(error instanceof NotFoundError) {
            return res.status(error.statusCode).json({ error: error.message })
        }

        return res.status(500).json({ error: 'Something went wrong' })
    }
}

const destroy = async (req, res) => {
    const commentId = parseInt(req.params.commentId)
    const userId = req.user.id

    try {
        await deleteComment(commentId, userId)

        return res.sendStatus(204)
    } catch (error) {
        if(error instanceof NotFoundError) {
            return res.status(error.statusCode).json({ error: error.message })
        }

        return res.status(500).json({ error: 'Something went wrong' })
    }
}
module.exports = {
    index,
    store,
    destroy
}