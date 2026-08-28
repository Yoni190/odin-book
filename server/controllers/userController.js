const { fetchUsers } = require('../services/userService')

const index = async(req, res) => {
    const userId = req.user.id
    const users = await fetchUsers(userId)

    return res.json(users)
}

module.exports = {
    index
}