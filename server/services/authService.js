const { prisma } = require('../lib/prisma')
const bcrypt = require('bcrypt')


const createUser = async (user) => {
    const hashedPassword = await bcrypt.hash(user.password, 10)

    const createdUser = await prisma.user.create({
        data: {
            fName: user?.fName,
            lName: user?.lName,
            username: user.username,
            email: user.email,
            password: hashedPassword,
        }
    })

    return createdUser
}

module.exports = {
    createUser
}