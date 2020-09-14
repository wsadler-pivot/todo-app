
/**
 * 
 */
export class TodoApp {
    constructor(todoListManager, { newTodoInputSelector, addNewTodButtonSelector, todoListSelector }) {
        this.newTodoInputText = "";
        this.newTodoInputSelector = newTodoInputSelector;
        this.todoListSelector = todoListSelector;
        this.addNewTodButtonSelector = addNewTodButtonSelector;
        this.todoListManager = todoListManager;
    }
    initialize() {
        this.$newTodoInput = document.querySelector(this.newTodoInputSelector);
        this.$todoList = document.querySelector(this.todoListSelector);
        this.$addNewTodButton = document.querySelector(this.addNewTodButtonSelector);
        this.initializeEventHandlers();
    }

    initializeEventHandlers() {
        this.$newTodoInput.addEventListener('input', this.updateNewTodoInputText.bind(this));
        this.$addNewTodButton.addEventListener('click', this.handleAddNewTodoClick.bind(this));
    }

    updateNewTodoInputText(e) {
        this.newTodoInputText = e.target.value;
    }

    resetNewTodo() {
        this.$newTodoInput.value = "";
        this.newTodoInputText = "";
    }

    handleAddNewTodoClick() {
        if (this.newTodoInputText.trim() !== "") {
            this.todoListManager.addNewTodo(this.newTodoInputText);
            this.todoListManager.renderTodoList(this.$todoList);
            this.resetNewTodo();
        }
    }
}

/**
 * 
 */
export class TodoListManager {
    constructor(todoFactory) {
        this.todos = [];
        this.todoFactory = todoFactory;
    }
    addNewTodo(title) {
        this.todos.push(this.todoFactory.createTodo(title));
    }
    renderTodoList(listElement) {
        listElement.innerHTML = "";
        const $todoList = document.createElement('ul');
        this.todos.forEach(t => {
            $todoList.appendChild(new TodoCard(t).getCardNode());
        });
        listElement.appendChild($todoList);
    }
}

/**
 * 
 */
export class TodoFactory {
    createTodo(title) {
        return new Todo(title);
    }
}

/**
 * 
 */
class Todo {
    constructor(title) {
        this.title = title;
        this.isCompleted = false;
    }
    toggleCompleted() {
        this.isCompleted = !this.isCompleted;
    }
}

/**
 * 
 */
class TodoCard {
    constructor(task) {
        this.task = task;
    }
    getCardNode() {
        const $li = document.createElement('li');
        $li.innerHTML = `
            <article class="todo-card ${this.task.isCompleted ? "todo-card--completed" : ""}">
                <h3 class="h3">${this.task.title}</h3>
            </article>
        `;
        return $li;
    }
}   