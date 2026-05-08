const TaskListController = require("../Controller/TaskListController");
const express = require("express")
const router = express.Router();

router.get("/", TaskListController.getTask);
router.post("/", TaskListController.addTask);
// router.patch("/update-task", TaskListController.renameT);
// router.delete("/delete-task", TaskListController.deleteTodo);
module.exports = router;

