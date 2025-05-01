import mongoose from "mongoose";

// console.log(process.env.MONGODB_URI);

const connectDatabase = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Database connected ✅");
    });
    await mongoose.connect(`${process.env.MONGODB_URI}/doctor`);
  } catch (error) {
    console.log("Failed to connect to database::", error);
  }
};

export default connectDatabase;
