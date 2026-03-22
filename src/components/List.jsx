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

    const getPrioritySort = (task) => {
        if (task.isDone && !task.dueDate) return 3;
        if (task.isDone && task.dueDate) return 2;
        if (!task.dueDate) return 1;
        else return 0;
    }

    const filteredtodos = getFilteredData().sort((a, b) => {
        const priorityA = getPrioritySort(a);
        const priorityB = getPrioritySort(b);

        if (priorityA !== priorityB) return priorityA - priorityB;
        if (priorityA === priorityB) return new Date(a.dueDate) - new Date(b.dueDate);;
    })

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
                    placeholder='Enter keywords to search'></input>
                <select className='filter-tabs'
                    onChange={onSelect}> Select filter
                    <option
                        value='all'> Select filter </option>
                    <option
                        value='completed'> Completed</option>
                    <option
                        value='inprogress'> In Progree</option>
                </select>
            </div>
            {todos.length > 0 ? (
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
            ) : (<p> No tasks yet ! </p>)}
        </div>
    )
}

export default List;