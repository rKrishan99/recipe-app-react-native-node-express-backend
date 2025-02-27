import mongoose from "mongoose";

const connectToDB = async (): Promise<void> => {
  try {
    const connection = await mongoose.connect(
      process.env.MONGO_URI as string
    );
    console.log(`MongoDB connected: ${connection.connection.host}`)
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectToDB;
