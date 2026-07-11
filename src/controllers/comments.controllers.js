import { Comment } from "../models/comments.models";
import { Post } from "../models/post.models";
export async function CreateComment(req,res){
    try {
        const {text,post} = req.body
        if(!text  || !post){
            return res.status(400).json({
                message: "Text and field required"
            })
        }
        const existingPost = await Post.findById(post)
        if(!existingPost){
            return res.status(404).json({
                message: "Post not found"
            })
        }
        const comment = await Comment.create({
            text,
            author: req.user_id,
            post

      })
        return res.status(201).json({
            message: "Created comment "
        })

            
        
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

export async function getAllComment(req,res){
    try {
        const comment = await Comment.find()
        return res.status(200).json({
            success: true,
            comment

        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

export async function updateComment(req,res){
    try {
        const {commentId} = req.params
        const{text,post} = req.body
        const comment = await Comment.findByIdAndUpdate(
            
            commentId,
        {
            text,
            post
        }, {new: true})
        if(!comment){
            return res.status(401).json({
                message: "Comment is not found"
            })
        }
        return res.status(200).json({
            message: "Updated comment"
        })
        if(comment.author.toString() === req.user_id){
            return res.status(403).json({
                 message: "You are not allowed to update this comment"
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

export async function deleteComment(req,res){
    try {
        const {commentId} = req.params
        const comment = await Comment.findByIdAndDelete(
            
            commentId,
              
        
        
        )

        if(!comment){
            return res.status(404).json({
                message: "Comment not found"
            })
        }
        return res.status(200).json({
            message: "Cpmment deleted"
        })
        
        
   if (comment.author.toString() !== req.user_id) {
            return res.status(403).json({
                message: "You are not allowed to delete this comment"
            });
        }

        await comment.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Comment deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}