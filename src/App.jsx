import { useState } from 'react';
import { useEffect } from 'react';
import './style.css';
import { TodoForm } from './TodoForm';
import TodoList from './TodoList';

// Regarding hooks - these have to be called at the top of our function. You canot use a hook conditionallly

// The Structure of components will be similar throughout.
// 1. Hooks at the top
// 2. Helper functions or parsing of code etc
// 3. Finall the JSX

export default function App() {
	// The state below checks our localstorage and if data exists, adds it to the initial state, else it returns an empty array
	const [todos, setTodos] = useState(() => {
		// Whatever is returned from the function will be the state value
		const localValue = localStorage.getItem('item');
		// If no value return empty array
		if(localValue == null) return [];
		// Else parse the JSON with the state values
		return JSON.parse(localValue);
	});

	// This function will run everytime and takes any new item and adds it to the array in local storage
	useEffect(() => {
		localStorage.setItem("item", JSON.stringify(todos))
	}, [todos])


	function addTodos(title) {
		// Grab the state change variable (setTodos) and apply the new value
		setTodos((currentTodos) => {
			return [
				...currentTodos,
				{id: crypto.randomUUID(), title, completed: false}
			]
		})		
	}

	function deleteTodo(id) {
		setTodos(currentTodos => {
			// Return filtered todos after checking if the ID's match
			return currentTodos.filter(todo => todo.id !== id)
		})
	}

	function toggleTodo(id, completed) {
		setTodos(currentTodos => {
			return currentTodos.map(todo => {
				if(todo.id === id) {
					// Here, we change the state, so we use the spread operator '...' return a new, updated array so we don't end up mutating
					return { ...todo, completed }
				}
				// If the ID doesn't match return as is
				return todo;
			})
		})
	}

	// UseEffect to log in updated list for dev
	useEffect(() => console.log(todos))

	return (
		<>
			<TodoForm onSubmit={addTodos} />
			<h1 className="header">To Do List</h1>
			<TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
		</>
	)
}

