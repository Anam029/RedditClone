
import { Router } from "express"
import { verifyJWT } from "../middlewares/verify-auth.middlewares.js"
import { GetCurrentUser, GetUserProfile, SearchUser } from "../controllers/user.controllers.js"

const router = Router()

router.get("/me", verifyJWT, GetCurrentUser)



router.get("/search",SearchUser)
router.get("/:username",GetUserProfile)

export default router