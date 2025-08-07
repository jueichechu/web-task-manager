import mongoose from "mongoose";

// export an async function named connectDB which connects to the MongoDB database using Mongoose
// uses the MONGO_URI from the environment variable to establish the connection
export const connectDB = async () => {
  try {
    // Read the MongoDB connection string from the environment: MONGO_URI should be set in the .env file
    // Await mongoose.connect() to establish a connection, returns a connection object
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1); //exit the Node.js process with a non-zero code to indicate failure
  }
};
