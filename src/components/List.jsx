import './List.css'
import ToDoItem from './TodoItem';
import { useState } from 'react'

const List = ({ todos, onUpdate, onDelete }) => {
    const [search, setSearch] = useState("");

    const onChangeSearch = (e) => {
        setSearch(e.target.value);
    }

    const getFilteredData = () => {
        if (search === "") {
            return todos;
        }
        return todos.filter((todo) =>
            todo.content.toLowerCase().includes(search.toLowerCase())
        )
    }

    const filteredtodos = getFilteredData();

    return (
        <div className='List'>
            <h4> ToDo List ✅</h4>
            <input
                value={search}
                onChange={onChangeSearch}
                placeholder='Enter Keywords To Search'></input>
            <div className="todos_wrapper">
                {filteredtodos.map((todo) => {
                    return <ToDoItem
                        key={todo.id} {...todo}
                        onUpdate={onUpdate}
                        onDelete={onDelete} />
                })}
            </div>
        </div>
    )
}

export default List;