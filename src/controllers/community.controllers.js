import { Community} from "../models/community.models";

export async function createCommunity (req,res){
     try {
        const {name,displayname,description,isPrivate} = req.body
     if(!name || !displayname){
        return res.status(400).json({
            success: false,
            message:"Name and display is required"
        })
        
     }

     const existingCommunity = Community.findOne({
        name = name.tolowercase()
     })
     if(existingCommunity){
        return res.status(409).json({
            succes:false,
            message: "Community already exist"
        })
     }
     const community = Community.create({
        name: name.tolowercase(),
        displayname,
        description,
        owner: [req.user_.id],
        moderators: [req.user_.id],
        members: [req.user_.id],



     })
     return res.status(201).json({
        message: "Sucessfully created community"
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
         return res.response(200).json({
            success:true,
            communities
         })
     } catch (error) {
         return res.response(500).json({
            success:false,
            message: error.message
         })
     }
}

export async function getOneCommunity(req,res){
   try {
     const {communityId} = req.body.params
     const community = await Community.findById({communityId})
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
         const community = await Community.findByIdAndUpdate(communityId)
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
       return res.satus(200).json({
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
      return res.status(200).json({
         message: "Deleted Community"
      })
   }
   } catch (error) {
      return res.status(500),json({
         message: error.message
      })
   }
}