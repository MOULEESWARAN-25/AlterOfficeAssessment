const express = require("express");
const cors = require("cors");
require("dotenv").config();
const TodoListRouter = require("./Routes/TodoListRoute");
const TaskListRouter = require("./Routes/TaskListRoute");
const SignUpRouter = require("./Routes/SignUpRoute");
const LoginRouter = require("./Routes/LoginRoute");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/todo/", TodoListRouter);
app.use("/api/task/", TaskListRouter);
app.use("/api/signup/", SignUpRouter);
app.use("/api/login/", LoginRouter);

// Centralized error handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandled Server Error:", err.stack || err);
  const status = err.status || 500;
  res.status(status).json({
    error: err.message || "An unexpected internal server error occurred."
  });
});

app.listen(PORT, () => {
  console.log("Server Started");
});

module.exports = app;
