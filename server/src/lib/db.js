import mongoose from "mongoose"

export const connectDB = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log("successfully mongoose connected")
    } catch (error) {
        console.log("Mongoose connection error", error)
    }
}