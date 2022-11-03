import express  from "express";
const router =express.Router()
import {getMessages,addMessages} from "../controllers/messages.js"

router.post("/addmsg",addMessages)
router.post("/getmsg",getMessages)




export default router