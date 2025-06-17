import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"

// import path from "path";

import{connectDB} from "./lib/db.js"
import authRoutes from "./routes/auth.route.js"
import taskRoutes from "./routes/task.route.js";

dotenv.config()
const app = express()

const PORT = process.env.PORT
// const __dirname = path.resolve();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser());
app.use(cors({
    origin:["http://localhost:5173","dapper-froyo-c36250.netlify.app"],
    credentials:true
}))

app.use("/api/auth",authRoutes)
app.use("/api/tasks", taskRoutes);

// if(process.env.NODE_ENV==="production"){
//     app.use(express.static(path.join(__dirname,"../client/dist")));

//     app.get("*",(req,res)=>{
//         res.sendFile(path.join(__dirname,"../client","dist","index.html"));
//     })
// }



app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
    connectDB()
})