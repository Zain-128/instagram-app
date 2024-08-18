import mongoose from "mongoose";

export const ConnectToMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Mongo Connected :");
  } catch (error) {
    console.log("Mongo Error : ", error);
  }
};
