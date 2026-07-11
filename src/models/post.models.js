import mongoose,{Schema} from "mongoose";

const postSchema = new Schema({
  title:{
    type: String,
    required: true,
    trim: true,
    maxlength: 300,
  },
  content:{
    type: String,
    default:" ",

  },
  author:{
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  community:{
    type: Schema.Types.ObjectId,
    ref: "Community"
  },
  upVotes: [{
    type: Schema.Types.ObjectId,
    ref: "User"


}],
downVotes: [
    {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
],
views:[{
    type: Number,
    default: "0"
}]


},{timestamps: true})


export const Post = mongoose.model("Post",postSchema)