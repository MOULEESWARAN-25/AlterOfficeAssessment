const TaskListController = require("../Controller/TaskListController");
const express = require("express")
const router = express.Router();

router.get("/", TaskListController.getTask);
router.post("/", TaskListController.addTask);
router.patch("/update-task", TaskListController.renameTask);
router.delete("/delete-task", TaskListController.deleteTask);
module.exports = router;

