import mongoose from 'mongoose';

export const connectToDB = async ()=> {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('MongoDB Connected')
    } catch (e) {
        console.error('MongoDB Connection Failed',e)
        process.exit(1)
    }
}

