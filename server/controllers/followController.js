const { fetchUserFollows } = require("../services/followService")



const index = async (req, res) => {
    const userId = req.user.id
    try {
        const follows = await fetchUserFollows(userId)

        return res.json({ follows })
    } catch (error) {
        return res.status(500).json({ error: 'Something went wrong' })
    }
}

module.exports = {
    index
}