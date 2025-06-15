import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"

import{connectDB} from "./src/lib/db.js"
import authRoutes from "./src/routes/auth.route.js"

dotenv.config()
const app = express()

const PORT = process.env.PORT

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5174",
    credentials:true
}))

app.use("/api/auth",authRoutes)

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
    connectDB()
})