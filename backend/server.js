const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// IMPORTANT: route import
const taskRoutes = require("./routes/taskRoutes");

// IMPORTANT: route usage
app.use("/tasks", taskRoutes);

app.get("/", (req, res) => {
    res.send("Server is running 🚀");
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});