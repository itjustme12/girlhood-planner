
var tasks = JSON.parse(localStorage.getItem("girlhoodTasks")) || [];

// Save the task list
function saveTasks() {
    localStorage.setItem("girlhoodTasks", JSON.stringify(tasks));
}

// Log out
function logout() {
    localStorage.removeItem("girlhoodLoggedIn");
    window.location.href = "petal-login.html";
}

// Check if the user is logged in
var currentPage = window.location.pathname;

if (
    currentPage.endsWith("blush-dashboard.html") ||
    currentPage.endsWith("petal-form.html") ||
    currentPage.endsWith("daily-bloom.html")
) {
    if (localStorage.getItem("girlhoodLoggedIn") !== "true") {
        window.location.href = "petal-login.html";
    }
}

// Display tasks on the dashboard
function displayTasks() {
    var table = document.getElementById("taskTable");

    if (table === null) {
        return;
    }

    table.innerHTML = "";

    var pending = 0;
    var completed = 0;

    for (var i = 0; i < tasks.length; i++) {
        var task = tasks[i];

        if (task.status === "Completed") {
            completed++;
        } else {
            pending++;
        }

        var row = document.createElement("tr");

        var nameCell = document.createElement("td");
        nameCell.textContent = task.name;

        var dateCell = document.createElement("td");
        dateCell.textContent = task.date;

        var priorityCell = document.createElement("td");
        priorityCell.textContent = task.priority;

        var statusCell = document.createElement("td");
        statusCell.textContent = task.status;

        var actionCell = document.createElement("td");

        // Complete or undo button
        var statusButton = document.createElement("button");

        if (task.status === "Completed") {
            statusButton.textContent = "Undo";
        } else {
            statusButton.textContent = "Complete";
        }

        statusButton.className = "action-button";
        statusButton.onclick = function(index) {
            return function() {
                toggleStatus(index);
            };
        }(i);

        // Edit button
        var editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.className = "action-button";

        editButton.onclick = function(index) {
            return function() {
                window.location.href = "petal-form.html?edit=" + index;
            };
        }(i);

        // Delete button
        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "action-button";

        deleteButton.onclick = function(index) {
            return function() {
                deleteTask(index);
            };
        }(i);

        actionCell.appendChild(statusButton);
        actionCell.appendChild(editButton);
        actionCell.appendChild(deleteButton);

        row.appendChild(nameCell);
        row.appendChild(dateCell);
        row.appendChild(priorityCell);
        row.appendChild(statusCell);
        row.appendChild(actionCell);

        table.appendChild(row);
    }

    document.getElementById("totalTasks").textContent = tasks.length;
    document.getElementById("pendingTasks").textContent = pending;
    document.getElementById("completedTasks").textContent = completed;

    var emptyMessage = document.getElementById("emptyMessage");

    if (tasks.length === 0) {
        emptyMessage.style.display = "block";
    } else {
        emptyMessage.style.display = "none";
    }
}

// Change a task's status
function toggleStatus(index) {
    if (index < 0 || index >= tasks.length) {
        return;
    }

    if (tasks[index].status === "Pending") {
        tasks[index].status = "Completed";
    } else {
        tasks[index].status = "Pending";
    }

    saveTasks();
    displayTasks();
}

// Delete a task
function deleteTask(index) {
    if (index < 0 || index >= tasks.length) {
        return;
    }

    var answer = confirm("Are you sure you want to delete this task?");

    if (answer) {
        tasks.splice(index, 1);
        saveTasks();
        displayTasks();
    }
}

// Add or edit a task
var taskForm = document.getElementById("taskForm");

if (taskForm !== null) {
    var parameters = new URLSearchParams(window.location.search);
    var editIndex = parameters.get("edit");

    if (editIndex !== null) {
        editIndex = Number(editIndex);

        if (
            Number.isInteger(editIndex) &&
            editIndex >= 0 &&
            editIndex < tasks.length
        ) {
            document.getElementById("formTitle").textContent = "Edit Task ♡";
            document.getElementById("saveButton").textContent = "Update Task ♡";

            document.getElementById("taskName").value = tasks[editIndex].name;
            document.getElementById("dueDate").value = tasks[editIndex].date;
            document.getElementById("priority").value = tasks[editIndex].priority;
            document.getElementById("taskStatus").value = tasks[editIndex].status;
        } else {
            editIndex = null;
        }
    }

    taskForm.addEventListener("submit", function(event) {
        event.preventDefault();

        var taskName = document.getElementById("taskName").value.trim();
        var dueDate = document.getElementById("dueDate").value;
        var priority = document.getElementById("priority").value;
        var status = document.getElementById("taskStatus").value;
        var message = document.getElementById("formMessage");

        if (
            taskName === "" ||
            dueDate === "" ||
            priority === "" ||
            status === ""
        ) {
            message.textContent = "Please complete all fields.";
            return;
        }

        if (
            priority !== "High" &&
            priority !== "Medium" &&
            priority !== "Low"
        ) {
            message.textContent = "Please choose a valid priority.";
            return;
        }

        if (status !== "Pending" && status !== "Completed") {
            message.textContent = "Please choose a valid status.";
            return;
        }

        var newTask = {
            name: taskName,
            date: dueDate,
            priority: priority,
            status: status
        };

        if (editIndex !== null) {
            if (editIndex >= 0 && editIndex < tasks.length) {
                tasks[editIndex] = newTask;
            } else {
                message.textContent = "Task not found. Please try again.";
                return;
            }
        } else {
            tasks.push(newTask);
        }

        saveTasks();
        window.location.href = "blush-dashboard.html";
    });
}

// Bible verses
var quotes = [
    {
        verse: "I can do all things through Christ which strengtheneth me.",
        reference: "Philippians 4:13 (KJV)"
    },
    {
        verse: "Trust in the LORD with all thine heart; and lean not unto thine own understanding.",
        reference: "Proverbs 3:5 (KJV)"
    },
    {
        verse: "Be still, and know that I am God.",
        reference: "Psalm 46:10 (KJV)"
    },
    {
        verse: "The LORD is my shepherd; I shall not want.",
        reference: "Psalm 23:1 (KJV)"
    },
    {
        verse: "Fear thou not; for I am with thee: be not dismayed; for I am thy God.",
        reference: "Isaiah 41:10 (KJV)"
    },
    {
        verse: "Commit thy works unto the LORD, and thy thoughts shall be established.",
        reference: "Proverbs 16:3 (KJV)"
    },
    {
        verse: "Let all that ye do be done in love.",
        reference: "1 Corinthians 16:14 (KJV)"
    },
    {
        verse: "This is the day which the LORD hath made; we will rejoice and be glad in it.",
        reference: "Psalm 118:24 (KJV)"
    }
];

// Change the Bible verse
function changeQuote() {
    var quoteText = document.getElementById("quoteText");
    var verseReference = document.getElementById("verseReference");

    if (quoteText === null || verseReference === null) {
        return;
    }

    var randomIndex = Math.floor(Math.random() * quotes.length);

    quoteText.textContent = '"' + quotes[randomIndex].verse + '"';
    verseReference.textContent = quotes[randomIndex].reference;
}

// Save today's goal
var goalForm = document.getElementById("goalForm");

if (goalForm !== null) {
    var savedGoal = localStorage.getItem("girlhoodGoal");

    if (savedGoal !== null) {
        document.getElementById("todayGoal").value = savedGoal;
    }

    goalForm.addEventListener("submit", function(event) {
        event.preventDefault();

        var goal = document.getElementById("todayGoal").value.trim();
        var goalMessage = document.getElementById("goalMessage");

        if (goal === "") {
            goalMessage.textContent = "Please write your goal first.";
        } else {
            localStorage.setItem("girlhoodGoal", goal);
            goalMessage.textContent = "Your goal has been saved ♡";
        }
    });
}

// Load tasks when the dashboard opens
displayTasks();
