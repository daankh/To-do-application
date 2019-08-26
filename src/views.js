import { getFilters } from "./filters";
import { getTodos, saveTodos, toggleTodo, removeTodo } from "./todos";

// renderTodos
// Arguments: none
// Return value: none
//Render application todos based on filters
const renderTodos = () => {
    const todoEl = document.querySelector('#todos')

    const filters = getFilters()
    const todos = getTodos()

    const filteredTodos = todos.filter((todo) => {
        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed
        return searchTextMatch && hideCompletedMatch
    })

    const incompleteTodos = filteredTodos.filter(todo => !todo.completed)

    todoEl.innerHTML = ""
    todoEl.appendChild(generateSummaryDOM(incompleteTodos))

    if (filteredTodos.length > 0) {
        filteredTodos.forEach((todo) => {
            todoEl.appendChild(generateTodoDOM(todo))
        })
    } else {
        const messageEl = document.createElement('p')
        messageEl.textContent = 'No to-dos to show'
        messageEl.classList.add('empty-message')
        todoEl.appendChild(messageEl)
    }
}

// generateTodoDOM
// Arguments: todo
// Return value: the todo element
//Get the DOM elements for an individual note
const generateTodoDOM = (todo) => {
    const todoEl = document.createElement('label')
    const containerEl = document.createElement('div')
    const checkbox = document.createElement('input')
    const todoText = document.createElement('span')
    const removeButton = document.createElement('button')

    //Setup todo checkbox - is todo completed?
    checkbox.setAttribute('type', 'checkbox')
    // checkbox.setAttribute('name', 'isCompleted')
    checkbox.checked = todo.completed
    checkbox.addEventListener('change', (e) => {
        toggleTodo(todo.id)
        saveTodos()
        renderTodos()
    })
    containerEl.appendChild(checkbox)

    //Setup the todo text
    todoText.textContent = todo.text
    containerEl.appendChild(todoText)

    //Setup container
    todoEl.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    todoEl.appendChild(containerEl)

    //Setup the remove todo button
    removeButton.textContent = 'Remove'
    removeButton.classList.add('button', 'button--text')
    removeButton.addEventListener('click', () => {
        removeTodo(todo.id)
        saveTodos()
        renderTodos()
    })
    todoEl.appendChild(removeButton)

    return todoEl
}

// generateSummaryDOM
// Arguments: incompletedTodos
// Return value: the summary element
//Get the DOM elements for list summary
const generateSummaryDOM = (incompleteTodos) => {
    const summary = document.createElement('h2')
    const plural = incompleteTodos.length === 1 ? '' : 's'
    summary.classList.add('list-title')
    summary.textContent = `You have ${incompleteTodos.length} todo${plural} left.`
    return summary
}

export { renderTodos }