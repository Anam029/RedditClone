import { Post } from "../models/post.models.js";

export async function createPosts(req,res){
     try {
        const {title,content,community} = req.body
        if(!title || !content || !community){
            return res.status(404).json({
                message: "All the fields are required"
            })
        }
        const post = await Post.create({
            title,
            content,
            author: req.user_id,
            community


        })
        return res.status(201).json({
            message: "Post created successfully "
        })
     } catch (error) {
        return res.status(500).json({
            message: "Sever error"
            
        })



     }
    }

export async function  getPost(req,res){
    try {
        const post = await Post.find()
        return res.status(200).json({
            success: true,
            post


        })
        
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

export async function getOnePost(req,res){
    try {
        const {PostId} = req.params
        const post = await Post.findById(PostId);
        if(!post){
            return res.status(404).json({
                message: "Post not found"
            })
        }
        return res.status(200).json({
          message: "Post updated sucessfully",
          post

});
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

export async function updatePost(req,res){
    
    try {
        const {PostId} = req.params
        const {title,content} = req.body
        const posts = await Post.findByIdAndUpdate(
    PostId,
    {
        title,
        content
    },
    {
        new: true
    }
)
     if(!posts){
        return res.status(404).json({
            message: "Post not found"
        })
        return res.status(200).json({
            message: "Update post sucessfully"
        })

     }
        
    } catch (error) {
        
    }
}

export async function deletePost(req,res){
    try {
        const {PostID} = req.params
        const post = await Post.findByIdAndUpdate(PostID)
        if(!post){
            return res.status(404).json({
                message: "Post not found"
            })
        
        }
        return res.status(200).json({
            message: "Deleted Post"
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }


}