import {Router} from "express"
import { verifyJWT } from "../middlewares/verify-auth.middlewares.js"

import { createPosts,getPost,getOnePost,updatePost,deletePost

}  from "../controllers/posts.controllers.js"
import { get } from "mongoose"

const router = Router()

router.post("/post",verifyJWT,createPosts)

router.get("/post",getPost)
router.get("/post/:postId",getOnePost)
router.patch("/post/:postId",updatePost)
router.delete("/post/:postId",deletePost)



export default router