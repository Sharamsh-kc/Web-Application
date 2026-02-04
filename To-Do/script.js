$("document").ready(function () {
    loadTasks();
});

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let completed = JSON.parse(localStorage.getItem("completed")) || [];

    $("#taskList").empty();
    $("#completedList").empty();

    tasks.forEach(function (task, index) {
        $("#taskList").append(`
            <li>
                ${task}
                <button onclick="completeTask(${index})">✔</button>
            </li>
        `);
    });

    completed.forEach(function (task, index) {
        $("#completedList").append(`
            <li>
                ${task}
                <button onclick="deleteCompleted(${index})">✖</button>
            </li>
        `);
    });
}

$("#addTask").click(function () {
    let task = $("#taskInput").val().trim();
    if (task === "") return;

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));
    $("#taskInput").val("");
    loadTasks();
});

$("#taskInput").on("keypress", function (e) {
    if (e.key === "Enter") {
        $("#addTask").click();
    }
});

function completeTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let completed = JSON.parse(localStorage.getItem("completed")) || [];

    completed.push(tasks[index]);
    tasks.splice(index, 1);

    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("completed", JSON.stringify(completed));
    loadTasks();
}

function deleteCompleted(index) {
    let completed = JSON.parse(localStorage.getItem("completed")) || [];
    completed.splice(index, 1);

    localStorage.setItem("completed", JSON.stringify(completed));
    loadTasks();
}
