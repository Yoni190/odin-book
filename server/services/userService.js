const { prisma } = require('../lib/prisma')

const fetchUsers = async (userId) => {
    console.log(userId)
    const users = await prisma.user.findMany({
        where: {
            id: {
                not: userId
            }
        },
        select: {
            id: true,
            username: true
        },
        orderBy: { username: 'asc' }
    })

    return users
}

module.exports = {
    fetchUsers
}