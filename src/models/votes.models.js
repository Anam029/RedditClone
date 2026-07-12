import mongoose,{Schema} from "mongoose";

const votesSchema = new Schema({
    post: {
        type: Schema.Types.ObjectId,
        ref: "Post",
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    type: {
        type: String,
        enum: ["upvote", "downvote"],
        required: true
    }
}, { timestamps: true });

export const Votes = mongoose.model("Votes", votesSchema);