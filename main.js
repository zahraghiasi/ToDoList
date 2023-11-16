const todos = JSON.parse(localStorage.getItem('todos')) || [];
const todosList = document.getElementById('todos');
const input = document.getElementById('searchInput');
const addTaskButton = document.getElementById('addButton');
const searchButton = document.getElementById('searchButton');
const remainingSpan = document.getElementById('remaining');
const completedSpan = document.getElementById('completed');
const totalSpan = document.getElementById('total');

function addTask(title) {
    input.value = '';
    todos.unshift({
        id: todos.length + 1,
        title: title,
        completed: false
    });
    updateTasks();
}

function deleteTask(index) {
    todos.splice(index, 1);
    updateTasks();
}

function updateStatus() {
    let totalTasks = todos.length;
    let completed = 0;
    let remaining = 0;

    for (let i in todos) {
        if (todos[i].completed) {
            completed++;
        } else {
            remaining++;
        }
    }

    localStorage.setItem('total', JSON.stringify(totalTasks));
    localStorage.setItem('completed', JSON.stringify(completed));
    localStorage.setItem('remaining', JSON.stringify(remaining));
}

function triggerTodoStatus(index) {
    const checked = todos[index].completed;
    todos[index].completed = !checked;
    updateTasks();
}

function render() {
    todosList.innerHTML = '';
    let completed = 0;
    let remaining = 0;
    let query = input.value;


    for (let i in todos) {
        if (query !== '' && !todos[i].title.includes(query)) {
            continue;
        }

        if (todos[i].completed) {
            completed++;
        } else {
            remaining++;
        }

        const checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.checked = todos[i].completed;
        checkbox.addEventListener('change', () => triggerTodoStatus(i));

        const title = document.createElement('span');
        title.innerText = todos[i].title;

        if (todos[i].completed) {
            title.style.textDecoration = 'line-through';
        }
        const x = document.createElement('span');
        x.innerText = 'X';
        x.classList.add('remove_item_button')

        x.addEventListener('click', () => deleteTask(i));

        const todoTitle = document.createElement('div');
        todoTitle.classList.add('todo-title');
        todoTitle.appendChild(checkbox);
        todoTitle.appendChild(title);
        const todosListItem = document.createElement('div');
        todosListItem.classList.add('todos-item');
        todosListItem.appendChild(todoTitle);
        todosListItem.appendChild(x);
        todosList.appendChild(todosListItem);
    }

    remainingSpan.innerText = remaining.toString();
    completedSpan.innerText = completed.toString();
    totalSpan.innerText = (remaining + completed).toString();
}

function updateTasks() {
    localStorage.setItem('todos', JSON.stringify(todos));
    render();
    updateStatus();
}

render();

addTaskButton.addEventListener('click', () => addTask(input.value));
searchButton.addEventListener('click', () => render());
input.addEventListener('keydown', (e) => {
    e.key === 'Enter' && render();
})
