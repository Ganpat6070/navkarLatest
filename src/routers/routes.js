const express = require("express");
const router = express.Router();

const {
  userRegistration,
  authUser,
  fetchTasks,
  generateTask,
  updateTaskApi,
  deleteTaskApi,
  getTaskById
} = require("../controller/controller");

router.post("/userRegistration", userRegistration);

router.post("/userLogin", authUser);

router.get("/usertasks", fetchTasks);
router.post("/createTask", generateTask);
router.post("/updateTask", updateTaskApi);
router.post("/deleteTask", deleteTaskApi);
router.post("/getTaskByIdApi", getTaskById);

module.exports = router;
