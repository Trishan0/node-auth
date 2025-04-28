export const isAdmin = (req, res, next) => {
    if (req.userInfo.role !== 'admin') {
        return res.status(403).json({
            success: false,
            message: "Access Denied. Admin Rights Required"
        })
    }
}