import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    message: { type: String, required: true },
    receiverId: [
      { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    ],
    senderId: [
      { type: mongoose.Schema.Types.ObjectId, ref: "post", required: true },
    ],
  },
  { timestamps: true }
);

const messageModel = mongoose.model("message", messageSchema);

module.exports = messageModel;
