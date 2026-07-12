import Router from "express"
import {createNotification,getAllNotifications,
    getOneNotification,
    markAsRead,markAllAsRead,deleteNotification
} from "../controllers/notification.controllers.js"

const router = Router()

router.post("/",createNotification)
router.get("/",getAllNotifications)
router.get("/:id",getOneNotification)
router.patch("/:id/read",markAsRead)
router.patch("/read-all",markAllAsRead)
router.delete("/:id",deleteNotification)

export default router