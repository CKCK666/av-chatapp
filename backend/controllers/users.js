import mongoose from "mongoose"
import User from "../models/userModel.js"

export const setAvatar = async(req,res)=>{
    const image =req.body.image
    try {
      const user =await User.findByIdAndUpdate(req.params.id,{
        
        isAvatarImageSet:true,
        avatarImage:image
      
        },{new : true})
        return res.json({
          isSet:true,
          image:user.avatarImage
        })
    } catch (error) {
      return res.json(error)
    }
  }

  export const getAllUser =async (req,res)=>{

 try {
  const users= await User.find({_id:{$ne:req.params.id}}).select([
    "email","username","avatarImage","_id"
  ])
  
 
  return res.json(users)
  
 } catch (error) {
  return res.json("all users errorr")
 }   

  }