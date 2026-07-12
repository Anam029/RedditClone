import mongoose, { Schema } from "mongoose";

const notificationSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    receiver: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    type: {
      type: String,
      enum: [
        "upvote",
        "downvote",
        "comment",
        "reply",
        "follow",
        "community_join",
      ],
      required: true,
    },

    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },

    comment: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },

    community: {
      type: Schema.Types.ObjectId,
      ref: "Community",
    },

    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

export const Notification = mongoose.model(
  "Notification",
  notificationSchema
);