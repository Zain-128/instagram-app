import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    profilePic: { type: String },
    bio: { type: String },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "post" }],
    bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: "post" }],
    gender: { type: Boolean, enum: ["male", "female", "other"] },
  },
  { timestamps: true }
);

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
