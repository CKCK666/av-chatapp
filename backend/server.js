import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDb from "./config/connection.js"
import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"
const app =express()
dotenv.config()
connectDb()
app.use(express.json())
app.use(cors())




app.use("/api/auth",authRoutes)
app.use("/api/users",userRoutes)


const PORT =process.env.PORT || 5000

const server =app.listen(PORT,()=>{
    console.log(`server running on ${PORT}`)
})