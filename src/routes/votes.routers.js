import { Router } from "express";
import {upVote,downVote}  from "../controllers/votes.controllers.js"
import { verifyJWT } from "../middlewares/verify-auth.middlewares.js";
const router = Router()

router.post("/upvote",verifyJWT,upVote)
router.post("downvote",verifyJWT,downVote)


export default router