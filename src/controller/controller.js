const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const User = require("../model/model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = "ganpat@123";

const userRegistration = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    res.status(400).json({
      message: "User already exists",
    });
    return;
  }

  const user = User.create({
    firstName,
    lastName,
    email,
    password,
  });
  if (user) {
    res
      .status(201)
      .json({ message: "user registered successfully!", data: user });
  } else {
    res.status(400).json({ message: "Sorry, some error occurred" });
  }
});

const authUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({ email });
  if (!user) {
    res.status(401).json({ message: "user not found" });
    return;
  }
  if (password) {
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      res.status(401).json("Invalid password");
      return;
    }
  }

  const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: "3d" });
  res.status(200).json({ message: "Logged in succesfully ", token: token });
});

const fetchTasks = asyncHandler(async (req, res) => {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, jwtSecret);

  const userFound = await User.findOne({ _id: decoded.id });

  if (!userFound) {
    return res.status(401).json("User not found");
  }

  return res.status(200).json({
    tasks: userFound.tasks,
  });
});

const generateTask = asyncHandler(async (req, res) => {
  const { fullName, email, gender, status } = req.body;
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, jwtSecret);

  const userFound = await User.findOne({ _id: decoded.id });

  if (!userFound) {
    return res.status(401).json("User not found");
  }

  const task = {
    _id: new mongoose.Types.ObjectId(),
    fullName,
    email,
    gender,
    status,
  };

  userFound.tasks.push(task);
  await userFound.save();

  return res.status(200).json({
    message: "Task added successfully",
    tasks: userFound.tasks,
  });
});


const updateTaskApi = asyncHandler(async (req, res) => {
  const { _id, fullName, email, gender, status } = req.body;
  console.log(_id, fullName, email, gender, status);
  const token = req.headers["authorization"];
  const decoded = jwt.decode(token, jwtSecret);

  // Find the user in the database
  const userFound = await User.findOne({ _id: decoded.id });

  if (!userFound) {
    return res.status(401).json("User not found");
  }

  const taskToUpdate = userFound.tasks.find(
    (task) => task._id.toString() === _id
  );

  if (!taskToUpdate) {
    return res.status(404).json("Task not found");
  }

  taskToUpdate.fullName = fullName;
  taskToUpdate.email = email;
  taskToUpdate.gender = gender;
  taskToUpdate.status = status;

  await User.findByIdAndUpdate(
    decoded.id,
    { tasks: userFound.tasks },
    { new: true }
  );

  console.log("upd", userFound);
  res.status(200).json({
    message: "Task updated successfully",
    tasks: userFound.tasks,
  });
});

const deleteTaskApi = asyncHandler(async (req, res) => {
  const { _id } = req.body;
  const token = req.headers["authorization"];
  const decoded = jwt.decode(token, jwtSecret);

  // Find the user in the database
  const userFound = await User.findOne({ _id: decoded.id });

  if (!userFound) {
    return res.status(401).json("User not found");
  }

  // Find the index of the task to delete
  const taskIndex = userFound.tasks.findIndex(
    (task) => task._id.toString() === _id
  );

  if (taskIndex === -1) {
    return res.status(404).json("Task not found");
  }

  // Remove the task from the user's tasks array
  userFound.tasks.splice(taskIndex, 1);

  // Save the updated user document
  await userFound.save();

  res.status(200).json({
    message: "Task deleted successfully",
    tasks: userFound.tasks,
  });
});

const getTaskById = asyncHandler(async (req, res) => {
  const { _id } = req.body;
  const token = req.headers["authorization"];
  const decoded = jwt.decode(token, jwtSecret);

  // Find the user in the database
  const userFound = await User.findOne({ _id: decoded.id });

  if (!userFound) {
    return res.status(401).json("User not found");
  }

  // Find the task by ID
  const task = userFound.tasks.find((task) => task._id.toString() === _id);

  if (!task) {
    return res.status(404).json("Task not found");
  }

  // Return the task
  res.status(200).json(task);
});

module.exports = {
  userRegistration,
  authUser,
  fetchTasks,
  generateTask,
  updateTaskApi,
  deleteTaskApi,
  getTaskById,
};
