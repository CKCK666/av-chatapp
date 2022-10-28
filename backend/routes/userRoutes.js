import express from "express";
const router =express.Router()
import {setAvatar,getAllUser } from "../controllers/users.js"


router.patch("/setavatar/:id",setAvatar)

router.get("/allusers/:id",getAllUser)

export default router