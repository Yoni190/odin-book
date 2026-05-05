const { fetchUserInfo } = require("../services/profileService")


const index = async (req, res) => {
    const userId = req.user.id

    try {
        const user = await fetchUserInfo(userId)

        return res.json({ user })
    } catch (error) {
        return res.status(500).json({ error: 'Something went wrong' })
    }
}

module.exports = {
    index
}