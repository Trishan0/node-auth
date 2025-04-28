import {Router} from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/admin.middleware.js";


export const adminRouter = Router()

adminRouter.get('/welcome', authMiddleware, isAdmin, (req, res) => {
    res.json({
        message: "Welcome to the admin page"
    })
})