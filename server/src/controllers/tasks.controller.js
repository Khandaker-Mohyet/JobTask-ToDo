import Task from "../models/task.model.js";

// Create Task

export const createTask = async (req, res) => {
  const { title, description, status } = req.body;
//   const userId = req.user._id;

  try {
    if (!title || !status) {
    return res.status(400).json({ message: "Title and status are required" });
  }
  const newTask = new Task({
      title,
      description,
      status,
    //   user: userId,
    });
    if(newTask){

        await newTask.save()

        res.status(201).json({
        _id: newTask._id,
        title: newTask.title,
        description: newTask.description,
        status: newTask.status
      })
    }else {
      res.status(400).json({message: "Invalid user data"})
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({message:"Internal server error"})
  }
};

// Get All Tasks for Logged-in User
export const getUserTasks = async (req, res) => {
//   const userId = req.user._id;

  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    console.log("Error in getUserTasks:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update Task
export const updateTask = async (req, res) => {
  const taskId = req.params.id;
//   const userId = req.user._id;
  const { title, description, status} = req.body;

  try {
    const task = await Task.findOne({ _id: taskId, });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;
    // task.dueDate = dueDate || task.dueDate;

    await task.save();

    res.status(200).json(task);
  } catch (error) {
    console.log("Error in updateTask:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete Task
export const deleteTask = async (req, res) => {
  const taskId = req.params.id;
//   const userId = req.user._id;

  try {
    const task = await Task.findOneAndDelete({ _id: taskId });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.log("Error in deleteTask:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
