const API = "http://localhost:5000/tasks";

function loadTasks() {
    fetch(API)
        .then(res => res.json())
        .then(tasks => {

            const taskList = document.getElementById("taskList");
            taskList.innerHTML = "";

            tasks.forEach(task => {

                const div = document.createElement("div");

                div.innerHTML = `
                    <h3>${task.title}</h3>
                    <p>${task.description}</p>
                    <p>Deadline: ${task.deadline?.split("T")[0] || task.deadline}</p>
                    <p>Status: ${task.priority}</p>

                    <button onclick="editTask(${task.id},
                    '${task.title.replace(/'/g, "\\'")}',
                    '${task.description.replace(/'/g, "\\'")}',
                    '${task.deadline?.split("T")[0] || task.deadline}')">
                        Edit
                    </button>

                    <button onclick="deleteTask(${task.id})">
                        Delete
                    </button>

                    <hr>
                `;

                taskList.appendChild(div);
            });
        })
        .catch(err => console.error(err));
}

function addTask() {

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const deadline = document.getElementById("deadline").value;

    fetch(`${API}/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title,
            description,
            deadline
        })
    })
    .then(res => res.json())
    .then(data => {

        alert(data.message);

        document.getElementById("title").value = "";
        document.getElementById("description").value = "";
        document.getElementById("deadline").value = "";

        loadTasks();
    })
    .catch(err => console.error(err));
}

function deleteTask(id) {

    if (!confirm("Delete this task?")) return;

    fetch(`${API}/delete/${id}`, {
        method: "DELETE"
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);
        loadTasks();
    })
    .catch(err => console.error(err));
}

function editTask(id, oldTitle, oldDescription, oldDeadline) {

    const title = prompt("Edit title:", oldTitle);
    if (title === null) return;

    const description = prompt("Edit description:", oldDescription);
    if (description === null) return;

    const deadline = prompt("Edit deadline (YYYY-MM-DD):", oldDeadline);
    if (deadline === null) return;

    fetch(`${API}/update/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title,
            description,
            deadline
        })
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);
        loadTasks();
    })
    .catch(err => console.error(err));
}

loadTasks();