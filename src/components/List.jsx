import './List.css'
import ToDoItem from './TodoItem';

const List = () => {
    return (
        <div className='List'>
            <h4> ToDo List ✅</h4>
            <input placeholder='Enter Keywords To Search'></input>
            <div className='todos_wrapper'>
                <ToDoItem />
                <ToDoItem />
                <ToDoItem />
            </div>
        </div>
    )
}

export default List;