const express = require("express");
const router = express.Router();

const {
    addTask,
    getTasks,
    updateTask,
    deleteTask
} = require("../controllers/taskController");

// CREATE
router.post("/add", addTask);

// READ
router.get("/", getTasks);

// UPDATE
router.put("/update/:id", updateTask);

// DELETE
router.delete("/delete/:id", deleteTask);

module.exports = router;