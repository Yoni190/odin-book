const { prisma } = require("../lib/prisma");

const fetchUserInfo = async (userId) => {
    const user = await prisma.user.findUnique({
        where: { id: userId }
    })

    return user
}

module.exports = {
    fetchUserInfo
}