const db = require("../db");
const { spawn } = require("child_process");
const path = require("path");

/* -------------------------
   ADD TASK (CREATE)
--------------------------*/
const addTask = (req, res) => {
    const { title, description, deadline } = req.body;

    // basic validation
    if (!title || !description || !deadline) {
        return res.status(400).send("Missing required fields");
    }

    const sql = `
        INSERT INTO tasks (title, description, deadline, priority)
        VALUES (?, ?, ?, ?)
    `;

    db.query(sql, [title, description, deadline, "Pending"], (err, result) => {
        if (err) {
            console.error("DB Error (addTask):", err);
            return res.status(500).send("Database error while adding task");
        }

        res.send("Task added successfully ✅");
    });
};

/* -------------------------
   GET ALL TASKS (READ)
--------------------------*/
const getTasks = (req, res) => {
    const sql = "SELECT * FROM tasks";

    db.query(sql, (err, results) => {
        if (err) {
            console.error("DB Error (getTasks):", err);
            return res.status(500).send("Database error while fetching tasks");
        }

        res.json(results);
    });
};

/* -------------------------
   DELETE TASK (DELETE)
   (for your frontend button)
--------------------------*/
const deleteTask = (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM tasks WHERE id = ?";

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("DB Error (deleteTask):", err);
            return res.status(500).send("Database error while deleting task");
        }

        if (result.affectedRows === 0) {
            return res.status(404).send("Task not found");
        }

        res.send("Task deleted successfully ✅");
    });
};

module.exports = {
    addTask,
    getTasks,
    deleteTask
};