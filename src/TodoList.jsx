import { TodoItem } from "./TodoItem"
import PropTypes from 'prop-types';

export default function TodoList({ todos, toggleTodo, deleteTodo }) {
    return (
        <ul className="list">
            {/* Below is an example of short circuiting */}
            {todos.length === 0 && <div className="empty-list"><p>No To Dos here yet. start by adding one.</p></div>}
            
            {todos.map(todo => {
                return <TodoItem {...todo} key={todo.id} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
            })}
        </ul>
    )
}
TodoList.propTypes = {
    todos: PropTypes.array.isRequired,
    toggleTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired
}