const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const GitHubStrategy = require('passport-github2').Strategy
const bcrypt = require('bcrypt')
const { prisma } = require('../lib/prisma')
require('dotenv').config()

passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
            const user = await prisma.user.findUnique({
                where: { username }
            })

            if(!user || !user.password) {
                return done(null, false, { message: 'Invalid Credentials' })
            }

            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch) {
                return done(null, false, { message: 'Invalid Credentials' })
            }

            return done(null, user)
        } catch (error) {
            return done(error)
        }
    }
))

// passport.use(new GitHubStrategy(
//     {
//         clientID: process.env.GITHUB_CLIENT_ID,
//         clientSecret: process.env.GITHUB_CLIENT_SECRET,
//         callbackURL: '/auth/github/callback'
//     },
//     async (accessToken, refreshToken, profile, done) => {
//         try {
//             let user = await prisma.user.findUnique({
//                 where: { githubId: profile.id }
//             })

//             if(!user) {
//                 user = await prisma.user.create({
//                     data: {
//                         githubId: profile.id,
//                         email: profile.emails?.[0]?.value,
//                         username: profile.username ?? `github_${profile.id}`,
//                         fName: profile.displayName?.split(' ')[0] ?? profile.username,
//                         lName: profile.displayName?.split(' ')[1] ?? '',
//                         avatar: profile.photos?.[0]?.value
//                     }
//                 })
//             }

//             return done(null, user)
//         } catch (error) {
//             return done(error)
//         }
//     }
// ))

module.exports = passport