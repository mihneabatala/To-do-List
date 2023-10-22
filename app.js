const inputText = document.querySelector("[data-input]");
const clearTasks = document.querySelector("[data-clear]");
const list = document.querySelector("[data-list]");
const addButton = document.querySelector("[data-add]");

// Load tasks from local storage when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    storedTasks.forEach(taskText => {
        addTaskToDOM(taskText);
    });
});

clearTasks.addEventListener("click", () => {
    list.innerHTML = '';
    // Clear tasks from local storage
    localStorage.removeItem('tasks');
});

inputText.addEventListener('keydown', (event) => {
    if (event.key == "Enter") {
        addtask();
    }
});

function createDeleteButton(li) {
    let btn = document.createElement('button');
    btn.setAttribute('class', 'task-btn');
    btn.innerHTML = "X";
    li.appendChild(btn);

    // Add a click event listener to the newly created delete button
    btn.addEventListener('click', () => {
        li.remove();
        updateLocalStorage();
    });
}

function addTaskToDOM(taskText) {
    let li = document.createElement("li");
    li.setAttribute('class', 'item');
    li.innerHTML = taskText;
    
    createDeleteButton(li); // Call the function to create the delete button

    list.appendChild(li);
}

function addtask() {
    if (inputText.value == "") {
        alert("You should add text !");
    } else {
        addTaskToDOM(inputText.value);
        inputText.value = "";

        updateLocalStorage();
    }
}

function updateLocalStorage() {
    const tasks = Array.from(list.querySelectorAll('.item')).map(item => {
        // Extract the task text without the "X" button
            console.log(item.children);
        return item.firstChild.nodeValue.trim();
    });
    
    localStorage.setItem('tasks', JSON.stringify(tasks));
}