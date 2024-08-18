import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    participants: [
      { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    ],
    messages: [
      { type: mongoose.Schema.Types.ObjectId, ref: "message", required: true },
    ],
  },
  { timestamps: true }
);

const conversationModel = mongoose.model("conversation", conversationSchema);

module.exports = conversationModel;
