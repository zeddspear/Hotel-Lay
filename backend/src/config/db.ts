import mongoose from "mongoose";

export const connectToDB = async function () {
  try {
    const connect = await mongoose.connect(process.env.DB_URI as string);
    console.log(`DB is connected`);
    return connect;
  } catch (error: any) {
    throw error;
  }
};
