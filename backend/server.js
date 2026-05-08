const express = require("express");
const cors = require("cors");
require("dotenv").config();
const TodoListRouter = require("./Routes/TodoListRoute");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/todo/", TodoListRouter);
app.listen(PORT, () => {
  console.log("Server is running");
});
