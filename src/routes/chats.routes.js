import {Router} from "express"
import {createChat,getChat,updateChat,deleteChat}   from "../controllers/chats.controllers.js"

const router = Router()

router.post("/chat",createChat)
router.get("/chat",getChat)
router.patch("/chat/id",updateChat)
router.delete("/chat/id",deleteChat)

export default router
