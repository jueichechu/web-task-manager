import mongoose from "mongoose";

// define a new schema for Task model
// the schema defines the structure of the documents in the collection
const taskSchema = new mongoose.Schema(
  {
    // required text field to hold the task description
    text: {
      type: String,
      required: true,
    },
    // boolean flag marking whether the task is complete/incomplete
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// create a Mongoose model named “Task” based on the schema
const Task = mongoose.model("Task", taskSchema);

export default Task;
