import './ToDoItem.css'
const ToDoItem = ({ id, isDone, content, date, onUpdate, onDelete }) => {

    const onChangeCheckBox = () => {
        onUpdate(id);
    }

    const onClickDeleteButton = () => {
        onDelete(id);
    }

    return (
        <div className="ToDoItem">
            <input
                onChange={onChangeCheckBox}
                checked={isDone}
                type="checkbox"></input>
            <div className="content">{content}</div>
            <div className="date">
                {new Date(date).toLocaleTimeString()}
            </div>
            <button
                onClick={onClickDeleteButton}
            >Delete</button>
        </div>
    )
}

export default ToDoItem;