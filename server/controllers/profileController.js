const { fetchUserInfo, editUserInfo } = require("../services/profileService")


const index = async (req, res) => {
    const userId = req.user.id

    try {
        const user = await fetchUserInfo(userId)

        return res.json({ user })
    } catch (error) {
        return res.status(500).json({ error: 'Something went wrong' })
    }
}

const update = async (req, res) => {
    const { username, email, fName, lName } = req.body
    const userId = req.params.id

    try {
        const user = await editUserInfo(userId, username, email, fName, lName)

        return res.json({ user })
    } catch (error) {
        return res.status(500).json({ error: 'Something went wrong' })
    }
}
module.exports = {
    index,
    update
}