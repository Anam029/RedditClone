import { Notification } from "../models/notification.models.js";

export async function createNotification(req, res) {
    try {
        const { receiver, sender, type, post, comment, community } = req.body;

        if (!receiver || !sender || !type) {
            return res.status(400).json({
                success: false,
                message: "Receiver, sender and type are required"
            });
        }

        const notification = await Notification.create({
            receiver,
            sender,
            type,
            post,
            comment,
            community
        });

        return res.status(201).json({
            success: true,
            message: "Notification created successfully",
            notification
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export async function getAllNotifications(req, res) {
    try {
        const notifications = await Notification.find({
            receiver: req.user._id
        })
            .populate("sender", "username")
            .populate("post")
            .populate("comment")
            .populate("community")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            notifications
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export async function getOneNotification(req, res) {
    try {
        const { notificationId } = req.params;

        const notification = await Notification.findById(notificationId)
            .populate("sender", "username profilePicture")
            .populate("post")
            .populate("comment")
            .populate("community");

        if (!notification) {
            return res.status(404).json({
                success: false,
                message: "Notification not found"
            });
        }

        return res.status(200).json({
            success: true,
            notification
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export async function markAsRead(req, res) {
    try {
        const { notificationId } = req.params;

        const notification = await Notification.findById(notificationId);

        if (!notification) {
            return res.status(404).json({
                success: false,
                message: "Notification not found"
            });
        }

        notification.isRead = true;

        await notification.save();

        return res.status(200).json({
            success: true,
            message: "Notification marked as read"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export async function markAllAsRead(req, res) {
    try {
        await Notification.updateMany(
            {
                receiver: req.user._id,
                isRead: false
            },
            {
                $set: {
                    isRead: true
                }
            }
        );

        return res.status(200).json({
            success: true,
            message: "All notifications marked as read"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export async function deleteNotification(req, res) {
    try {
        const { notificationId } = req.params;

        const notification = await Notification.findByIdAndDelete(notificationId);

        if (!notification) {
            return res.status(404).json({
                success: false,
                message: "Notification not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Notification deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}