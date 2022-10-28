import mongoose from "mongoose"
import User from "../models/userModel.js"
import bcrypt from "bcrypt"



//desc user register
//route POST api/auth/register
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
    
   
  
  
    // delete newUser.password

   return res.json({status:true,user:newUser})
        
    } catch (error) {
      console.log(error)
     return res.json(error,"ggggg")
  }
}


//desc user login
//route POST api/auth/login
  export const login= async (req,res)=>{
   const {username,password}=req.body
   try {
    const user= await User.findOne({username})
    if (!user) {
     return res.json({status:false,mgs:"User is not found"})
    }

   const isPasswordValid=await bcrypt.compare(password,user.password)
    if(!isPasswordValid){
      return res.json({status:false,mgs:"Invalid password"})
    }
    return res.json({status:true,user})
    
   } catch (error) {
    return res.json(error)
   }
}

