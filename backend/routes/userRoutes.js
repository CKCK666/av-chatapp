import express from "express";
const router =express.Router()
import { register,login } from "../controllers/user.js"; 

//register route
router.post("/register",register)




export default router
