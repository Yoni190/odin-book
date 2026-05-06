const { NotFoundError } = require("../lib/errors")
const { fetchUserFollows, createFollow, deleteFollow } = require("../services/followService")



const index = async (req, res) => {
    const userId = req.user.id
    try {
        const follows = await fetchUserFollows(userId)

        return res.json({ follows })
    } catch (error) {
        return res.status(500).json({ error: 'Something went wrong' })
    }
}

const store = async (req, res) => {
    const followerId = req.user.id
    const followingId = parseInt(req.params.id)

    if(followerId === followingId) {
        return res.status(422).json({ error: 'You cannot follow yourself' })
    }

    try {
        const follow = await createFollow(followerId, followingId)

        return res.json({ follow })
    } catch (error) {
        if(error instanceof NotFoundError) {
            return res.status(error.statusCode).json({ error: error.message })
        }
        return res.status(500).json({ error: 'Something went wrong' })
    }
}

const destroy = async (req, res) => {
    const followerId = req.user.id
    const followingId = parseInt(req.params.id)

    if(followerId === followingId) {
        return res.status(422).json({ error: 'You cannot unfollow yourself' })
    }

    try {
        const follow = await deleteFollow(followerId, followingId)

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