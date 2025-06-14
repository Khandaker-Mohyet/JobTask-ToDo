import express from "express";

import authRoutes from "./src/routes/auth.route.js"

const app = express()

app.use("/api/auth",authRoutes)

app.listen(5005,()=>{
    console.log("server is running on port 5005")
})