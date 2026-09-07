const { prisma } = require('../lib/prisma')
const bcrypt = require('bcrypt')


const createUser = async (userData) => {
    const { fName, lName, username, email, password, avatar } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await prisma.user.create({
        data: {
            fName,
            lName,
            username,
            email,
            password: hashedPassword,
            avatar, // store the key/path
        },
    });

    return createdUser;
}

module.exports = {
    createUser
}