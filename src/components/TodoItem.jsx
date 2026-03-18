import './ToDoItem.css'
const ToDoItem = () => {
    return (
        <div className="ToDoItem">
        <input type="checkbox"></input>
        <div className="content">todo</div>
        <div className="date">Date</div>
        <button>Delete</button>
        </div>
    )
}

export default ToDoItem;