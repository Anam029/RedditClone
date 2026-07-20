import { User } from "../models/user.models.js"; 


export async function GetCurrentUser(req,res){
    try {
        const user = await User.findById(req.user.id).select("-password -refreshToken")
        if(!user){
            return res.status(404).json({
                message: "User not found"
            })
        }
        return res.status(200).json({
            user: user
        })
    } catch (error) {
        return res.status(500).json({
            message: "Server error"
        })
    }

}

export async function GetUserProfile(req,res){
    try {
        const username = req.params.username
        const user = await User.findOne({
            username
        }).select("-password -refreshToken")
        if(!user){
            return res.status(404).json({
                message : "User not found"
            })
        }
        return res.status(202).json({
            user
        })
    } catch (error) {
        return res.status(500).json({
            message : "Server error"
        })
        
    }
}

export async function SearchUser(req,res){
    try {
        const {keyword} = req.query
        console.log(keyword)
        const users = await User.find({
           username:{
            $regex: keyword,
            $options: "i"
          
           }
           
           
        }).select("-password -refreshToken")
        console.log(users)
      
       if(users.length === 0){
        return res.status(404).json({
            message: "No users found "
        })
       }
       return res.status(200).json({
        users
       })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
          message : "Server error"
        })
    }

}