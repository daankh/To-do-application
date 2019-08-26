// Add necessary imports
import { renderTodos } from './views'
import { setFilters } from "./filters";
import { createTodo, saveTodos } from "./todos";

//Initial todos rendering
renderTodos()

//Filtering todos
document.querySelector('#search-text').addEventListener('input', (e) => {
    setFilters({
        searchText: e.target.value,
    })
    renderTodos()
})

//Hiding completed todos
document.querySelector('#hide-completed').addEventListener('change', (e) => {
    // filters.hideCompleted = e.target.checked
    setFilters({
        hideCompleted: e.target.checked,
    })
    renderTodos()
})

//Adding new todo
document.querySelector('#new-todo').addEventListener('submit', (e) => {
    e.preventDefault()

    const text = e.target.elements.text.value.trim()
    if (text.length > 0) {
        createTodo(text)
        renderTodos()
        e.target.elements.text.value = ""
    }
})