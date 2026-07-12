import { Router } from "express"
import { verifyJWT } from "../middlewares/verify-auth.middlewares.js"
import {
    createCommunity, getAllCommunity,getOneCommunity, updateCommunity,deleteCommunity
} from "../controllers/community.controllers.js"

const router = Router()

router.post("/community",verifyJWT,createCommunity)

router.get("/community",getAllCommunity)

router.get("/community/:communityId",getOneCommunity )

router.patch("/community/:communityId",updateCommunity)
 
router.delete("/community/communityId",deleteCommunity)
export default router