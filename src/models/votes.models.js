import mongoose ,{Schema} from "mongoose"

const voteSchema = new Schema({
   post:{
    type: Schema.Types.ObjectId,
    ref: "Post"
   },
   user:{
     type: Schema.Types.ObjectId,
     ref: "User"
   },
   votes:{
    type: String,
    enum: ["upvote","downvote"],
    required: true
   }
},{timestamps: true})
 export const Vote = mongoose.model("Vote",voteSchema)