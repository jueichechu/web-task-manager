import { useEffect, useState } from "react"; // import React hooks for managing state and side-effects
// import icons
import { FaCheck } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { FaPencil } from "react-icons/fa6";
import { FaTrashCan } from "react-icons/fa6";
import axios from "axios"; // use Axios to communicate with backend API endpoints (make HTTP requests to fetch/send data to a server)

function App() {
  // React state hooks
  const [newTask, setNewTask] = useState(""); // newTask holds the current value of the input field for adding a task
  const [tasks, setTasks] = useState([]); // tasks holds the array of task objects(each has _id, text, completed) fetched from the backedn (MongoDB via API)
  const [editingTask, setEditingTask] = useState(null); // editingTask stores the _id of the task currently being edited, or null
  const [editedText, setEditedText] = useState(""); // editedText stores the text value of the task currently being edited in-progress

  // POST /tasks - create a new task
  const addTask = async (e) => {
    e.preventDefault(); // prevent form from reloading the page
    if (!newTask.trim()) return; // do not add empty input task
    try {
      // Send POST /tasks with { text } to the Express/MongoDB backend
      const response = await axios.post("/tasks", { text: newTask });
      // Append the newly created task (response.data) to the local "tasks" array
      setTasks([...tasks, response.data]);
      setNewTask(""); // clear the input field after adding the tasks
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // GET /tasks - fetch all tasks
  const fetchTasks = async () => {
    try {
      const response = await axios.get("/tasks"); // the backend queries MongoDB for all task documents
      console.log(response.data); // inspect the array in devtools
      setTasks(response.data); // load tasks into state newTask, so React re-renders the list
    } catch (error) {
      console.log("Error fetching tasks:", error);
    }
  };

  // useEffect hook: ensures that fetchTasks() function runs only when the component is initially rendered and mounted
  useEffect(() => {
    fetchTasks();
  }, []); // empty dependency array, runs once when component mounts (dependency array controls when the useEffect hook re-runs)

  const startEditing = (task) => {
    setEditingTask(task._id); // mark which task is in edit mode
    setEditedText(task.text); // prefill input with its current text
  };

  // PUT /tasks/:id - update a task
  const saveEdit = async (id) => {
    try {
      // PUT to /tasks/:id with the new text. backend updates MongoDB doc
      const response = await axios.put(`/tasks/${id}`, {
        text: editedText,
      });
      // Replace the old task in local state with the updated one from response.data
      setTasks(tasks.map((task) => (task._id === id ? response.data : task)));
      setEditingTask(null); // exit edit mode
    } catch (error) {
      console.log("Error updating task:", error);
    }
  };

  // DELETE /tasks/:id - delete a task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`/tasks/${id}`); // send DELETE request to backend to remove task with given id from MongoDB
      // filter out the deleted task so it vanishes from the UI instantly
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.log("Error deleting task:", error);
    }
  };

  // PUT /tasks/:id - toggle completion status
  const toggleTask = async (id) => {
    try {
      // find the task by id in the local state
      const task = tasks.find((t) => t._id === id);
      // send PUT request to backend to toggle its completed status
      const response = await axios.put(`/tasks/${id}`, {
        completed: !task.completed,
      });
      // replace it in local state with the toggled version
      setTasks(tasks.map((t) => (t._id === id ? response.data : t)));
    } catch (error) {
      console.log("Error toggling task completion status:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from grayscale-50 to-gray-100 flex items-center justify-center p-4">
      {/* Card container */}
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8">
        {/* Header */}
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Web-Based Task Manager
        </h1>
        {/* Add-task form */}
        <form
          onSubmit={addTask}
          className="flex items-center gap-2 shadow-sm border rounded-lg border-gray-200 p-2"
        >
          {/* Controlled text input */}
          <input
            className="flex-1 outline-none px-3 py-2 text-gray-700 placeholder-gray-400"
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="What should we tackle today?"
            required
          />
          {/* Submit button */}
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md font-medium cursor-pointer"
          >
            Add Task
          </button>
        </form>

        {/* Task list */}
        <div className="mt-4">
          {tasks.length === 0 ? (
            // Empty placeholder when no tasks exist
            <div></div>
          ) : (
            <div className="flex flex-col gap-4">
              {tasks.map((task) => (
                <div key={task._id}>
                  {editingTask === task._id ? (
                    // Editing task mode UI
                    <div className="flex items-center gap-x-3">
                      <input
                        className="flex-1 p-3 border rounded-lg border-gray-200 outline-none focus:ring-2 
                          focus: ring-blue-300 text-gray-700 shadow-inner"
                        type="text"
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                      />
                      <div className="flex gap-x-2">
                        {/* Save changes button */}
                        <button
                          onClick={() => saveEdit(task._id)}
                          className="px-4 py-2 bg-green-500 text-white rounded-lg 
                          hover:bg-green-600 cursor-pointer"
                        >
                          <FaCheck />
                        </button>
                        {/* Cancel editing button */}
                        <button
                          className="px-4 py-2 bg-gray-300 text-gray-600 rounded-lg 
                          hover:bg-gray-400 cursor-pointer"
                          onClick={() => setEditingTask(null)}
                        >
                          <IoCloseSharp />
                        </button>
                      </div>
                    </div>
                  ) : (
                    // Display task mode UI
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-x-4 overflow-hidden">
                          {/* Toggle completion button */}
                          <button
                            onClick={() => toggleTask(task._id)}
                            className={`h-6 w-6 border rounded-full flex items-center justify-center flex-shrink-0 ${
                              task.completed
                                ? "bg-green-500 border-green-500"
                                : "border-gray-300 hover:border-blue-400"
                            }`}
                          >
                            {task.completed && <FaCheck />}
                          </button>
                          {/* Task text (struck-through if completed) */}
                          <span
                            className={`text-gray-800 font-medium truncate ${
                              task.completed ? "line-through text-gray-400" : ""
                            }`}
                          >
                            {task.text}
                          </span>
                        </div>
                        {/* Edit & Delete action buttons */}
                        <div className="flex gap-x-2">
                          <button
                            className="p-2 text-blue-500 hover:text-blue-700 rounded-lg hover:bg-blue-50 duration-200"
                            onClick={() => startEditing(task)}
                          >
                            <FaPencil />
                          </button>
                          <button
                            onClick={() => deleteTask(task._id)}
                            className="p-2 text-red-500 hover:text-red-700 rounded-lg hover:bg-red-50 duration-200"
                          >
                            <FaTrashCan />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
