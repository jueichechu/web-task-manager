import express from "express"; // for routing and handling HTTP requests
import Task from "../models/task.model.js"; // to access Task collection in MongoDB

const router = express.Router(); // create new Router instance, "mini-app" to attach to the main app

// Create RESTful API routes:
// GET /tasks - fetch all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find(); // Mongoose model find() to fetch all tasks documents from MongoDB collection
    res.json(tasks); // send the tasks back to client as JSON
  } catch (error) {
    res.status(500).json({ message: error.message }); // internal server error
  }
});

// POST /tasks - create a new task (with title text)
router.post("/", async (req, res) => {
  const task = new Task({
    text: req.body.text, // get the task description from the request body from client
  });
  try {
    const newTask = await task.save(); // save the new task document to the MongoDB collection
    res.status(201).json(newTask); // send the newly created task as a JSON response with status 201 (Created)
  } catch (error) {
    res.status(400).json({ message: error.message }); // send error response with status 400 (Bad Request)
  }
});

// PUT /tasks/:id - toggle completion status or update a task
router.put("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id); // find the task by its ID from the request parameters from client
    if (!task) return res.status(404).json({ message: "Task not found" }); // if task not found, send 404 status code

    if (req.body.text !== undefined) {
      task.text = req.body.text; // update the task's text if provided in the request body
    }
    if (req.body.completed !== undefined) {
      task.completed = req.body.completed; // update the task's completion status if provided in the request body
    }

    const updatedTask = await task.save(); // save updated task back to MongoDB collection
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE /tasks/:id - delete a task
router.delete("/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id); // find the task by ID and delete it from collection
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router; // export the configured router to be mounted in the main server file server.js
