import uuidv4 from "uuid/v4"

// Setup the empty todos array
let todos = []

// loadTodos
// Arguments: none
// Return value: none
//Fetch existing todos from localStorage
const loadTodos = () => {
    const todosJSON = localStorage.getItem('todos')

    try {
        return todosJSON ? JSON.parse(todosJSON) : []
    } catch (error) {
        return []
    }
}

// saveTodos
// Arguments: none
// Return value: none
//Save todos to localStorage
const saveTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos))
}

// getTodos
// Arguments: none
// Return value: todos array
const getTodos = () => todos


// createTodo
// Arguments: todo text
// Return value: none
const createTodo = (text) => {
    todos.push({
        id: uuidv4(),
        text: text,
        completed: false
    })

    saveTodos()
}

// removeTodo
// Arguments: id of todo to remove
// Return value: none
//Remove todo based on its id
const removeTodo = (id) => {
    const todoIndex = todos.findIndex(todo => todo.id === id)

    if (todoIndex > -1) {
        todos.splice(todoIndex, 1)
    }
}

// toggleTodo
// Arguments: id of todo to toggle
// Return value: none
//Toggle the completed value for a given todo by id
const toggleTodo = (id) => {
    const todo = todos.find(todo => todo.id === id)

    if (todo !== undefined) {
        todo.completed = !todo.completed
    }
}


todos = loadTodos()

export { loadTodos, saveTodos, getTodos, createTodo, removeTodo, toggleTodo }