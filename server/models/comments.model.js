import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    author: [
      { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    ],
    post: [
      { type: mongoose.Schema.Types.ObjectId, ref: "post", required: true },
    ],
  },
  { timestamps: true }
);

const commentModel = mongoose.model("post", commentSchema);

module.exports = commentModel;
