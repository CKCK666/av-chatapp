import mongoose from "mongoose"
import User from "../models/userModel.js"
import bcrypt from "bcrypt"

export const register= async (req,res)=>{
    const {username,email,password}=req.body
  try {
   
    const checkUser= await User.findOne({username})
    if(checkUser){
        return res.json({mgs:"Username already used",status:false
    })}
    const checkEmail= await User.findOne({email})
     if (checkEmail){
        return res.json({mgs:"Email already used",status:false
    })}
        
    const hashedPassword=await bcrypt.hash(password,10)
    
    const newUser= await User.create({
        username,email,password:hashedPassword
    })
   
    delete newUser.password

   return res.json({status:true,user:newUser})
        
    } catch (error) {
     return res.json("internal  error at register route")
  }
}




  export const login=()=>{

}