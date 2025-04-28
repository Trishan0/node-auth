import { Router } from "express";
import { registerUser, loginUser } from '../controllers/auth.controller.js';

export const authRouter = Router();

// all routes are related to authentication and authorization
authRouter.post('/register',registerUser)
authRouter.post('/login',loginUser)