const TodoListController = require("../Controller/TodoListController");
const express = require("express")
const router = express.Router();

router.get("/", TodoListController.getTodo);
router.post("/", TodoListController.addTodo);
router.patch("/update-todo", TodoListController.renameTodo);
router.delete("/delete-todo", TodoListController.deleteTodo);
module.exports = router;

