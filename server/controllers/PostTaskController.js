import mongoose from "mongoose";
import PostTask from "../models/PostTaskModel.js";
import UserModel from "../models/UserModel.js";

export const getUserTasks = async (req, res) => {
  const userId = req.params.userId;

  try {
    const tasks = await PostTask.find({
      creator: userId
    });

    const user = await UserModel.findById(userId);
    const userEmail = user.email;

    const sharedTasks = await PostTask.find({
      sharedWith:
        userEmail
    })

    console.log(`sharedTasks: ${sharedTasks}`)

    res.status(200).json([...tasks, ...sharedTasks]);

  } catch (error) {
    console.log(error)
    res.status(404).json({ message: error.message })
  }
}

export const createTasks = async (req, res) => {
  const task = req.body;

  // if (!req.userId) return res.json({ message: "Unauthenticated"});

  const newTask = new PostTask(task);

  try {
    await newTask.save()

    res.status(201).json(newTask);

  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}

export const updateTask = async (req, res) => {
  const { taskId: _id } = req.params;

  const task = req.body

  console.log(task)

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No task with that id");

  const updatedTask = await PostTask.findByIdAndUpdate(_id, task, { new: true });

  res.json(updatedTask);

}

export const deleteTask = async (req, res) => {
  const { taskId: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No task with that id");

  const deleteTask = await PostTask.findByIdAndRemove(_id);

  res.json({ message: "Task deleted sucessfully" });
}