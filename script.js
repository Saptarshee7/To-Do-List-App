document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
});

function addTask() {
    let taskInput = document.getElementById("taskInput").value;
    let dueDate = document.getElementById("dueDate").value;
    let reminderTime = document.getElementById("reminderTime").value;
    let category = document.getElementById("category").value;

    if (taskInput === "") {
        alert("Please enter a task!");
        return;
    }

    let task = {
        text: taskInput,
        dueDate: dueDate,
        reminderTime: reminderTime,
        category: category,
        completed: false
    };

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
    clearInputs();
}

function loadTasks() {
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    
    tasks.forEach((task, index) => {
        let li = document.createElement("li");
        li.innerHTML = `
            <span class="task-text ${task.completed ? 'completed' : ''}">${task.text} (${task.category}) - Due: ${task.dueDate} at ${task.reminderTime}</span>
            <button onclick="toggleComplete(${index})">✔</button>
            <button onclick="deleteTask(${index})">❌</button>
        `;
        taskList.appendChild(li);
    });
}

function toggleComplete(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}

function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}

function clearInputs() {
    document.getElementById("taskInput").value = "";
    document.getElementById("dueDate").value = "";
    document.getElementById("reminderTime").value = "";
}
