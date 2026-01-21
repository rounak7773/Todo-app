let task = [];
let editIndex = null;

const updateNumbers = () => {
    const completed = task.filter(t => t.completed).length;
    const total = task.length;

    document.getElementById('numbers').innerText = `${completed} / ${total}`;
};


const addTask = () => {
    const taskInput = document.getElementById('taskInput');
    const taskValue = taskInput.value.trim();

    if (taskValue === "") return;

    if (editIndex !== null) {
        // ✅ update existing task
        task[editIndex].text = taskValue;
        editIndex = null;
        document.getElementById('newTask').innerText = "+";
    } else {
        // ✅ add new task
        task.push({ text: taskValue, completed: false });
    }
    
    taskInput.value = "";
    updateTaskList();
    updateNumbers();
};



const updateTaskList = () => {
    const tasklist = document.getElementById('task-list');
    tasklist.innerHTML = "";

    task.forEach((taskItem, index) => {
        const listItem = document.createElement('li');

        listItem.innerHTML = `
            <div class="taskItem">
                <div class="task ${taskItem.completed ? 'completed' : ''}">
                    <input 
                        type="checkbox" 
                        class="checkbox" 
                        ${taskItem.completed ? "checked" : ""} 
                        onchange="toggleTaskComplete(${index})"
                    />
                    <p>${taskItem.text}</p>
                </div>
                <div class="icons">
                    <img src="edit.png" onclick="editTask(${index})" />
                    <img src="bin.png" onclick="deleteTask(${index})" />
                    
                </div>
            </div>
        `;

        tasklist.appendChild(listItem);
    });
};

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('newTask').addEventListener('click', (e) => {
        e.preventDefault();
        addTask();
    });
});

const deleteTask = (index) => {
    task.splice(index, 1);
    updateTaskList();
    updateNumbers(); // ✅

};


const editTask = (index) => {
    const taskInput = document.getElementById('taskInput');

    taskInput.value = task[index].text; // put text in input
    taskInput.focus();

    editIndex = index;

    // change + button to ✓
    document.getElementById('newTask').innerText = "✔";
};


const toggleTaskComplete = (index) => {
    task[index].completed = !task[index].completed;
    updateTaskList();
    updateNumbers(); // ✅

};
