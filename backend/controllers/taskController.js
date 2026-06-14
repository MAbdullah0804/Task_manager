const db = require("../db");

// CREATE TASK
const addTask = (req, res) => {
    const { title, description, deadline } = req.body;

    if (!title || !description || !deadline) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }

    const sql = `
        INSERT INTO tasks (title, description, deadline, priority)
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [title, description, deadline, "Pending"],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    success: false,
                    message: "Database error"
                });
            }

            res.status(201).json({
                success: true,
                message: "Task added successfully"
            });
        }
    );
};

// READ TASKS
const getTasks = (req, res) => {
    db.query("SELECT * FROM tasks ORDER BY id DESC", (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                success: false,
                message: "Database error"
            });
        }

        res.json(results);
    });
};

// UPDATE TASK
const updateTask = (req, res) => {
    const { id } = req.params;
    const { title, description, deadline } = req.body;

    const sql = `
        UPDATE tasks
        SET title = ?, description = ?, deadline = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [title, description, deadline, id],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    success: false,
                    message: "Database error"
                });
            }

            res.json({
                success: true,
                message: "Task updated successfully"
            });
        }
    );
};

// DELETE TASK
const deleteTask = (req, res) => {
    const { id } = req.params;

    db.query(
        "DELETE FROM tasks WHERE id = ?",
        [id],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    success: false,
                    message: "Database error"
                });
            }

            res.json({
                success: true,
                message: "Task deleted successfully"
            });
        }
    );
};

module.exports = {
    addTask,
    getTasks,
    updateTask,
    deleteTask
};