import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    caption: { type: String, required: true },
    image: { type: String, required: true },
    video: { type: String, required: true },
    profilePic: { type: String },
    bio: { type: String },
    author: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }],
  },
  { timestamps: true }
);

const postModel = mongoose.model("post", postSchema);

module.exports = postModel;
