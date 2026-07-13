import { Chat } from "../models/chats.models.js";



export async function createChat(req, res) {
    try {
        const { sender, receiver, chat } = req.body;

        
        if (!sender || !receiver || !chat) {
            return res.status(400).json({
                success: false,
                message: "Sender, receiver and chat are required."
            });
        }

        
        const newChat = await Chat.create({
            sender,
            receiver,
            chat
        })      
        return res.status(201).json({
            success: true,
            message: "Chat created successfully.",
            data: newChat
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
}


export async function getChat(req, res) {
    try {
        const { sender, receiver } = req.query;

        if (!sender || !receiver) {
            return res.status(400).json({
                success: false,
                message: "Sender and Receiver are required"
            });
        }

        const chats = await Chat.find({
            $or: [
                { sender, receiver },
                { sender: receiver, receiver: sender }
            ]
        })
        .populate("sender", "username email")
        .populate("receiver", "username email")
        .sort({ createdAt: 1 });

        return res.status(200).json({
            success: true,
            chats
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export async function updateChat(req, res) {
    try {
        const { chatId } = req.params;
        const { chat } = req.body;

        if (!chatId) {
            return res.status(400).json({
                success: false,
                message: "Chat ID is required"
            });
        }

        if (!chat) {
            return res.status(400).json({
                success: false,
                message: "Chat message is required"
            });
        }

        const updatedChat = await Chat.findByIdAndUpdate(
            chatId,
            { chat },
            { new: true }
        );

        if (!updatedChat) {
            return res.status(404).json({
                success: false,
                message: "Chat not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Chat updated successfully",
            updatedChat
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export async function deleteChat(req,res){
    try {
        const {chatId} = req.params
        if (!chatId) {
            return res.status(400).json({
                success: false,
                message: "Chat ID is required"
            });
        }

        const deletedChat = await Chat.findByIdAndDelete(chatId);

        if (!deletedChat) {
            return res.status(404).json({
                success: false,
                message: "Chat not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Chat deleted successfully"
        });

        
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}