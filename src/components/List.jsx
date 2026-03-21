import './List.css'
import TodoItem from './TodoItem';
import { useState } from 'react'

const List = ({ todos, onUpdate, onDelete, onEdit, onEditDueDate }) => {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");

    const onChangeSearch = (e) => {
        setSearch(e.target.value);
    }

    const getFilteredData = () => {
        if (search === "" && filter === 'all') {
            return todos;
        } else if (filter == 'completed') {
            return todos.filter((todo) =>
                todo.content.toLowerCase().includes(search.toLowerCase()) && (todo.isDone === true)
            )
        } else if (filter == 'inprogress') {
            return todos.filter((todo) =>
                todo.content.toLowerCase().includes(search.toLowerCase()) && (todo.isDone === false)
            )
        } else {
            return todos.filter((todo) =>
                todo.content.toLowerCase().includes(search.toLowerCase())
            )
        }
    }

    const filteredtodos = getFilteredData();

    const onSelect = (e) => {
        setFilter(e.target.value);
    }

    return (
        <div className='List'>
            <h4> ToDo List ✅</h4>
            <div className='Filter'>
                <input
                    value={search}
                    onChange={onChangeSearch}
                    placeholder='Enter Keywords To Search'></input>
                <select onChange={onSelect}> Select filter
                    <option
                        value='all'> Select filter </option>
                    <option
                        value='completed'> Completed</option>
                    <option
                        value='inprogress'> In Progree</option>
                </select>
            </div>
            <div className="todos_wrapper">
                {filteredtodos.map((todo) => {
                    return <TodoItem
                        key={todo.id} {...todo}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                        onEdit={onEdit}
                        onEditDueDate={onEditDueDate}
                    />
                })}
            </div>
        </div>
    )
}

export default List;