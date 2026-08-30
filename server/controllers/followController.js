const { NotFoundError } = require("../lib/errors")
const { fetchUserFollowRequests, createFollow, deleteFollow, updateFollowRequest } = require("../services/followService")
const { AppError } = require('../utils/errors')

const requests = async (req, res) => {
    const userId = req.user.id
    try {
        const follows = await fetchUserFollowRequests(userId)

        return res.json(follows)
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


const getUserFollowers = async (req, res) => {
    const userId = parseInt(req.params.id)
    try {
        const follows = await fetchUserFollows(userId)

        return res.json({ follows })
    } catch (error) {
        return res.status(500).json({ error: 'Something went wrong' })
    }
}

const update = async (req, res) => {
    const id = parseInt(req.params.id)
    const { status } = req.body
    const userId = req.user.id  

    if(!['ACCEPTED', 'REJECTED'].includes(status)) {
        return res.status(400).json({ error: 'Status must be ACCEPTED or REJECTED' })
    }

    try {
        const updated = await updateFollowRequest(id, userId, status)

        return res.json({ follow: updated })
    } catch (error) {
        console.error(error);
        
        const statusCode = error instanceof AppError ? error.statusCode : 500
        const message = error instanceof AppError ? error.message : 'Internal server error'

        return res.status(statusCode).json({ error: message })
    }
}

module.exports = {
    requests,
    store,
    destroy,
    getUserFollowers,
    update
}