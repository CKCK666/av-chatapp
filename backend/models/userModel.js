import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        max:20,
        min:3
    },
    email:{
        type:String,
        required:true,
        unique:true,
        max:50
    },
    password:{
        type:String,
        required:true,
        min:8
    },
    isAvatarImgSet:{
        type:Boolean,
        default:false
    },
    avatarImg:{
        type:String,
        default:""
    }

})

const User=mongoose.model("User",userSchema)


export default User