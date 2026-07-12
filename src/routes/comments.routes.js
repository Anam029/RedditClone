import {Router} from "express"
import { verifyJWT } from "../middlewares/verify-auth.middlewares.js"
import {CreateComment, getAllComment, updateComment, deleteComment} from "../controllers/comments.controllers.js"
import { createCommunity } from "../controllers/community.controllers.js"

const router = Router()

router.post("/comment",createCommunity)
router.get("/comment",getAllComment)
router.patch("/comment/:commentId",updateComment)
router.delete("/comment/:commentId",deleteComment)


export default router