import express from 'express';
import dotenv from 'dotenv';
import { connectToDB } from './database/db.js';
import { authRouter } from './routes/auth.routes.js';
import { homeRouter } from './routes/home.routes.js';
import { adminRouter } from './routes/admin.routes.js';

dotenv.config();
connectToDB();


const app = express();
const PORT = process.env.PORT;

//middleware
app.use(express.json());

app.use('/api/auth', authRouter)
app.use('/api/home', homeRouter)
app.use('/api/admin', adminRouter)

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})