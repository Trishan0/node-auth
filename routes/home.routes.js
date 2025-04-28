import express, { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
export const homeRouter = Router()

homeRouter.get('/welcome', authMiddleware,  (req, res)=> {
    const { username, userId, role} = req.userInfo;
    res.json({
        message: "Welcome to the home page",
        user: {
            _id : userId,
            username,
            role
        }
    })
})