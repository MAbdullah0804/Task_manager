const express = require("express");
const router = express.Router();

const { addTask, getTasks, deleteTask } = require("../controllers/taskController");

// CREATE TASK
router.post("/add", addTask);

// READ ALL TASKS
router.get("/", getTasks);

// Delete Task 

router.delete("/delete/:id", deleteTask);

module.exports = router;