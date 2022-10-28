import express from "express";
const router =express.Router()
import { register,login } from "../controllers/auth.js"; 

//register route
router.post("/register",register)

//login route
router.post("/login",login)




export default router
