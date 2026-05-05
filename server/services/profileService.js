const { prisma } = require("../lib/prisma");

const fetchUserInfo = async (userId) => {
    const user = await prisma.user.findUnique({
        where: { id: userId }
    })

    return user
}

const editUserInfo = async (userId, username, email, fName, lName) => {
    const user = await prisma.user.findUnique({
        where: { username }
    })

    if(user) throw new Error('Username already taken')


    console.log(username)

    const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
            username, email, fName, lName
        }
    })

    return updatedUser
}

module.exports = {
    fetchUserInfo,
    editUserInfo
}