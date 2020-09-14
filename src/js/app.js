import {
    TodoApp,
    TodoFactory,
    TodoListManager,
} from './todo-app';

new TodoApp(
    new TodoListManager(new TodoFactory()),
    {
        todoListSelector: "#todoList",
        newTodoInputSelector: "#newTodoInput",
        addNewTodButtonSelector: "#addNewTodo" 
    }
).initialize();