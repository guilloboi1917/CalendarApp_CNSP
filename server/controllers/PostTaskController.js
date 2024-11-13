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

    res.status(200).json([...tasks, ...sharedTasks]);

  } catch (error) {
    console.log(error)
    res.status(404).json({ message: error.message })
  }
}

export const createTasks = async (req, res) => {
  const task = req.body;

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
  const { userId: _userId } = req.params

  const task = req.body

  if (_userId !== task["creator"]) return res.status(403).send("Not creator!")

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

export const shareTask = async (req, res) => {
  const { taskId: _id } = req.params;
  const { userId: _userId } = req.params

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No task with that id");

  const task = await PostTask.findById(_id).exec()

  if (_userId !== task["creator"]) return res.status(403).send("Not creator!")

  const { email: sharedEmail } = req.body

  const user = await UserModel.findOne({ email: sharedEmail }).exec();
  const taskCreator = await UserModel.findById(_userId)

  if (!user) return res.status(404).send("No user with that email found");
  if (task["sharedWith"].indexOf(sharedEmail) !== -1)
    return res.status(200).send("Email already shared")

  const updatedTask = await PostTask.findByIdAndUpdate(
    _id,
    { $push: { sharedWith: sharedEmail } },
    { new: true }
  )

  const updatedUser = await UserModel.findByIdAndUpdate(user._id,
    {
      $push: {
        sharedNotifications: {
          read: false,
          who: taskCreator.email,
          content: `${taskCreator.email} shared task ${task.title} with you!`
        }
      }
    },
    { new: true }
  )


  res.status(201).json(updatedTask)

}

export const unshareTask = async (req, res) => {
  const { taskId: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No task with that id");

  const task = await PostTask.findById(_id).exec()

  const { email: sharedEmail } = req.body

  console.log(task["sharedWith"])
  if (task["sharedWith"].indexOf(sharedEmail) === -1)
    return res.status(200).send("Email already not shared")

  const updatedTask = PostTask.findByIdAndUpdate(
    _id,
    { $pull: { sharedWith: sharedEmail } },
    { new: true },
    (err) => {
      if (err) return res.status(404).send("Unsharing failed");
    }
  )

  res.status(201).json(updatedTask)

}