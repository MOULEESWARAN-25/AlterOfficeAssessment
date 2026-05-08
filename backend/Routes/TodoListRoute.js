const TodoListController = require("../Controller/TodoListController");
const express = require("express");
const { verifyToken } = require("../Middleware/AuthMiddleware");
const router = express.Router();

router.get("/", verifyToken, TodoListController.getTodo);
router.post("/", verifyToken, TodoListController.addTodo);
router.patch("/update-todo", verifyToken, TodoListController.renameTodo);
router.delete("/delete-todo", verifyToken, TodoListController.deleteTodo);
module.exports = router;

