document.getElementById('task-form').addEventListener('submit', addTask);

function addTask(e) {
    e.preventDefault();

    const title = document.getElementById('task-title').value;
    const desc = document.getElementById('task-desc').value;

    if (title && desc) {
        const task = { title, desc, completed: false };
        addTaskToDOM(task);
        saveTask(task);

        document.getElementById('task-form').reset();
    }
}

function addTaskToDOM(task) {
    const taskList = task.completed ? document.getElementById('completed-tasks') : document.getElementById('pending-tasks');
    
    const li = document.createElement('li');
    li.className = 'task-item' + (task.completed ? ' completed' : '');
    li.innerHTML = `
        <span>${task.title}: ${task.desc}</span>
        <div class="task-actions">
            <button class="complete-btn">${task.completed ? 'Undo' : 'Complete'}</button>
            <button class="delete-btn">Delete</button>
        </div>
    `;

    li.querySelector('.complete-btn').addEventListener('click', () => toggleComplete(task, li));
    li.querySelector('.delete-btn').addEventListener('click', () => deleteTask(task, li));

    taskList.appendChild(li);
}

function saveTask(task) {
    const tasks = getTasksFromStorage();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasksFromStorage() {
    return localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
}

function loadTasks() {
    const tasks = getTasksFromStorage();
    tasks.forEach(task => addTaskToDOM(task));
}

function toggleComplete(task, li) {
    task.completed = !task.completed;
    updateTaskInStorage(task);
    li.remove();
    addTaskToDOM(task);
}

function deleteTask(task, li) {
    const tasks = getTasksFromStorage().filter(t => t.title !== task.title || t.desc !== task.desc);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    li.remove();
}

function updateTaskInStorage(updatedTask) {
    const tasks = getTasksFromStorage();
    const index = tasks.findIndex(task => task.title === updatedTask.title && task.desc === updatedTask.desc);
    tasks[index] = updatedTask;
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

document.addEventListener('DOMContentLoaded', loadTasks);
