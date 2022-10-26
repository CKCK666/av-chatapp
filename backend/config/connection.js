import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()

const connectDb=()=>{
    const connect=mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=>{console.log("db is connected")})
    .catch((err)=>{err.message})
}

export default connectDb