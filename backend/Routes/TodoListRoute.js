const TodoListController = require("../Controller/TodoListController");
const express = require("express")
const router = express.Router();

router.get("/", TodoListController.getTodo);
router.post("/", TodoListController.addTodo);
router.patch("/update-todo/:id", TodoListController.renameTodo);
router.delete("/delete-todo/:id", TodoListController.deleteTodo);
module.exports = router;

