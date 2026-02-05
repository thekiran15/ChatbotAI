import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export const protect = async (req, res, next) => {

    let token = req.headers.authorization

    try {

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Not authorized, no token"
            })
        }

        // ✅ FIX 1: remove "Bearer "
        if (token.startsWith("Bearer ")) {
            token = token.split(" ")[1]
        }

        // ✅ FIX 2: correct env access
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // ✅ FIX 3: correct id access
        const userId = decoded.id

        const user = await User.findById(userId).select("-password")

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Not authorized, user not found"
            })
        }

        req.user = user
        next()   // ✅ next now works

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Not authorized, token failed"
        })
    }
}
