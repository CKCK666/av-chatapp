import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDb from "./config/connection.js"
import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import messageRoutes from "./routes/messageRoutes.js"
import {Server}from "socket.io"
const app =express()
dotenv.config()
connectDb()
app.use(express.json())
app.use(cors())




app.use("/api/auth",authRoutes)
app.use("/api/users",userRoutes)
app.use("/api/messages",messageRoutes)


const PORT =process.env.PORT || 5000

const server =app.listen(PORT,()=>{
    console.log(`server running on ${PORT}`)
})
const io =new Server(server, {
    cors: {
      origin: "https://res-avatar-chatapp-static.onrender.com",
      credentials: true,
    },
  });
  
  global.onlineUsers = new Map();
  io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
      onlineUsers.set(userId, socket.id);
    });
  
    socket.on("send-msg", (data) => {
      const sendUserSocket = onlineUsers.get(data.to);
      if (sendUserSocket) {
        socket.to(sendUserSocket).emit("msg-recieve", data.msg);
      }
    });
  });