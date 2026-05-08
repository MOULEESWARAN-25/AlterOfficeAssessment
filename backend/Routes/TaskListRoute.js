const TaskListController = require("../Controller/TaskListController");
const express = require("express");
const { verifyToken } = require("../Middleware/AuthMiddleware");
const router = express.Router();

router.get("/", verifyToken, TaskListController.getTask);
router.post("/", verifyToken, TaskListController.addTask);
router.patch("/update-task", verifyToken, TaskListController.renameTask);
router.delete("/delete-task", verifyToken, TaskListController.deleteTask);
module.exports = router;

