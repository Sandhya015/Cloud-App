document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("todo-form");
    const taskInput = document.getElementById("task-input");
    const todoList = document.getElementById("todo-list");

    // Handle form submission
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const taskText = taskInput.value;
        if (taskText.trim() === "") return; // Don't allow empty tasks

        addTask(taskText);
        taskInput.value = ""; // Clear input field
    });

    // Add new task to the list
    function addTask(task) {
        const li = document.createElement("li");

        const taskText = document.createElement("span");
        taskText.textContent = task;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-btn");

        deleteButton.addEventListener("click", () => {
            li.remove();
        });

        // Toggle task completion
        taskText.addEventListener("click", () => {
            li.classList.toggle("completed");
        });

        li.appendChild(taskText);
        li.appendChild(deleteButton);
        todoList.appendChild(li);
    }
});
