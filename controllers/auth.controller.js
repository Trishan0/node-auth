import { User } from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// register user
const registerUser = async (req, res) =>{
    try{
        // extract data from the request body
        const {username, email, password, role} = req.body;

        //check if the user already exists
        const checkExistingUser = await User.findOne({$or: [{username}, {email}]})
        if (checkExistingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists either with this username or email "
            })
        }

        //hash user pwd
        const salt = await bcrypt.genSalt(10);
        const hashedPwd = await bcrypt.hash(password, salt);

        //create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPwd,
            role : role || "user"
        })

        await newUser.save();

        if (newUser) {
            res.status(201).json({
                success: true,
                message: "User created successfully"
            })
        } else {
            return res.status(400).json({
                success: false,
                message: "Unable to create user "
            })
        }

    } catch (e) {
        console.log(e)
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: e

        })
    }
}


// login controller
const loginUser = async (req, res) =>{
    try{
        const {username, password} = req.body;
        //find the current user exists in the db or not

        const user = await User.findOne({username});

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User doesn't exists"
            })
        }

        const isPwdMatch = await bcrypt.compare(password,user.password)

        if (!isPwdMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid Password"
            })
        }
        const accessToken = jwt.sign({
            userId : user._id,
            username: user.username,
            role: user.role
        }, process.env.JWT_SECRET_KEY, {
            expiresIn : "15m"
        })

        res.status(200).json({
            success:true,
            message : "Logged in Successful",
            accessToken
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: e

        })
    }
}

export {
    registerUser,
    loginUser
}