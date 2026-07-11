import {Router} from "express"
import { verifyJWT } from "../middlewares/verify-auth.middlewares"
import {CreateComment, getAllComment, updateComment, deleteComment}from "../controllers/comments.controllers"
import { createCommunity } from "../controllers/community.controllers"

const router = Router()

router.post("/comment",createCommunity)
router.get("/comment",getAllComment)
router.patch("/comment/:commentId",updateComment)
router.delete("/comment/:commentId",deleteComment)