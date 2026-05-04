import { verifyAccessToken } from "../utils/jwt.js";

export const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization

    if(!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'No token provided' })
    }

    try {
        const token = authHeader.split(' ')[1]
        req.user = verifyAccessToken(token)
        next()
    } catch (error) {
        return res.status(403).json({ error: 'Token expired or invalid' })
    }
}