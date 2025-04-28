import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next)=>{
    const authHeader = req.headers["authorization"]
    console.log(authHeader)
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Access Denied"
        })
    }

    // decode token
    try {
        const decodedTokenInfo = jwt.verify(token, process.env.JWT_SECRET_KEY)
        console.log('decoded... ',decodedTokenInfo)

        req.userInfo = decodedTokenInfo
        next()

    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "Access Denied"
        })
    }

}