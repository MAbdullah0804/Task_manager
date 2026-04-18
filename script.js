const API = "http://localhost:5000/tasks";

/* -------------------------
   LOAD TASKS (READ)
--------------------------*/
function loadTasks() {
    fetch(API)
        .then(res => res.json())
        .then(data => {
            const list = document.getElementById("taskList");
            list.innerHTML = "";

            data.forEach(task => {
                const div = document.createElement("div");
                div.innerHTML = `
                    <h3>${task.title}</h3>
                    <p>${task.description}</p>
                    <p>Deadline: ${task.deadline}</p>
                    <p>Priority: ${task.priority}</p>
                    <button onclick="deleteTask(${task.id})">Delete</button>
                    <hr>
                `;
                list.appendChild(div);
            });
        })
        .catch(err => console.log("LOAD ERROR:", err));
}

/* -------------------------
   ADD TASK (CREATE)
--------------------------*/
function addTask() {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const deadline = document.getElementById("deadline").value;

    fetch(`${API}/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title, description, deadline })
    })
    .then(res => res.text())
    .then(data => {
        alert(data);

        // refresh list after adding
        loadTasks();
    })
    .catch(err => console.log("ADD ERROR:", err));
}

/* -------------------------
   DELETE TASK (DELETE)
--------------------------*/
function deleteTask(id) {
    fetch(`${API}/delete/${id}`, {
        method: "DELETE"
    })
    .then(res => res.text())
    .then(data => {
        alert(data);
        loadTasks();
    })
    .catch(err => console.log("DELETE ERROR:", err));
}

/* -------------------------
   AUTO LOAD ON START
--------------------------*/
loadTasks();