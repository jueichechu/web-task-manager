import express from "express";
import dotenv from "dotenv";
import taskRoutes from "./routes/task.route.js"; // import the task routes
import { connectDB } from "./config/db.js"; // import connectDB() function from db.js file. Make sure to add the .js extension

dotenv.config(); // loads .env file contents into process.env by default

const app = express(); // creates an instance of an Express application

app.use(express.json()); // middleware in Express that allows server to parse incoming JSON request bodies into req.body

// Mounts the specified middleware function taskRoutes router at the specified path "/api/tasks"
// the middleware function is executed when the base of the requested path matches path
app.use("/api/tasks", taskRoutes);

// listen to incoming request on port 5000. The callback function is executed once the server starts up
app.listen(5000, () => {
  connectDB();
  console.log("Server started on port http://localhost:5000");
});
