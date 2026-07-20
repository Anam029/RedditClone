import { Community} from "../models/community.models.js";

export async function createCommunity (req,res){
     try {
        const {name,displayname,description,isPrivate} = req.body
     if(!name || !displayname){
        return res.status(400).json({
            success: false,
            message:"Name and display is required"
        })
        
     }

     const existingCommunity = await Community.findOne({
       name: name.toLowerCase()
        
     })
     if(existingCommunity){
        return res.status(409).json({
            succes:false,
            message: "Community already exist"
        })
     }
     const community = await  Community.create({
        name: name.toLowerCase(),
        displayname,
        description,
        owner: req.user._id,
        moderators: [req.user._id],
         members: [req.user._id]



     })
     return res.status(201).json({
        message: "Sucessfully created community",
        community
     })
     } catch (error) {
        return res.status(500).json({
            sucess: false,
            message: error.message

        })
     }
}

export async function getAllCommunity(req,res){
     try {
         const communities = await Community.find()
         return res.status(200).json({
            success:true,
            communities
         })
     } catch (error) {
         return res.status(500).json({
            success:false,
            message: error.message
         })
     }
}

export async function getOneCommunity(req,res){
   try {
     const {communityId} = req.params
     const community = await Community.findById(communityId)
     if(!community){
      return res.status(404).json({
         message: "Community not found"
      })
     }
     return res.status(200).json({
      message: "Community fetch successfully",
      community
     })


   } catch (error) {
      return res.status(500).json({
         message: error.message
      })
   }

}

export async function updateCommunity(req,res){
       try {
         const {communityId} = req.params
         const {name,isPrivate} = req.body
         const community = await Community.findById(communityId)
       if(!community){
         return res.status(404).json({
            message : "Community not found"
         })
       }
       
      if(name !== undefined){
         community.name = name
      }
      if(isPrivate !== undefined){
         community.isPrivate = isPrivate
      }
        await community.save()
       return res.status(200).json({
         message: "Update community succesfully"
       })

       } catch (error) {
         return res.status(500).json({
            message: error.message
         })
       }
}

export async function deleteCommunity(req,res){
   try {
      const {communityId} = req.params

   const community = await Community.findByIdAndDelete(communityId)
   if(!community){
      return res.status(404).json({
         message: "Community not found"
      })
      
   }
   return res.status(200).json({
         message: "Deleted the Community"
      })
   } catch (error) {
      return res.status(500).json({
         message: error.message
      })
   }
}

