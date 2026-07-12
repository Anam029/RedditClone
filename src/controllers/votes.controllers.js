import Vote from "../models/vote.model.js";
import Post from "../models/post.model.js";

export const upVote = async (req, res) => {
    try {
        const { postId } = req.body;
        const userId = req.user._id;

        if (!postId) {
            return res.status(400).json({
                success: false,
                message: "Post ID is required"
            });
        }

       
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        
        const existingVote = await Vote.findOne({
            user: userId,
            post: postId
        });

        
        if (!existingVote) {
            await Vote.create({
                user: userId,
                post: postId,
                type: "upvote"
            });

            return res.status(201).json({
                success: true,
                message: "Post upvoted"
            });
        }

        
        if (existingVote.type === "upvote") {
            await Vote.findByIdAndDelete(existingVote._id);

            return res.status(200).json({
                success: true,
                message: "Upvote removed"
            });
        }

        
        existingVote.type = "upvote";
        await existingVote.save();

        return res.status(200).json({
            success: true,
            message: "Changed to upvote"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export async function downVote(req,res){
    try {
        const {postId} = req.body
    const userId = req.user_id
    if(!postId){
        return res.status(402).json({
            message: "PostId not found"
        })
    }
    const post = await Post.findById(postId)
    if(!post){
        return res.status(402).json({
            message: "Post not find"
        })
    }
 if(!userId){
    return res.status(402).json({
        message: "UserId not found"
    })
 }
  const existingVote = await Vote.findOne({
     user: userid,
     post: postId,
  })
  if(!existingVote){
    await Vote.create({
        user: userid,
        post: postId,
        type: "downvote"
    })
    return res.status(201).json({
        message: "Post downVote"
    })
  }
 if( existingVote.type === "downvote"){
        await Vote.findByIdAndDelete(existingVote._id)
        return res.status(200).json({
            sucess: true,
            message: "Downvote removed"
        })
    }
  existingVote.type = "downvote"
    existingVote.save()
    return res.status(200).json({
        message: "Change to downvote"
    })
  
  
    

  
    

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}