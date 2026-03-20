import './ToDoItem.css'
import { useState } from 'react'

const ToDoItem = ({ id, isDone, content, dueDate, onUpdate, onDelete, onEdit}) => {

    const onChangeCheckBox = () => {
        onUpdate(id);
    }

    const onClickDeleteButton = () => {
        onDelete(id);
    }

    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState("");
    const onClickEditButton = () => {
        setIsEditing(true);
        setEditContent(content)
    }
    const onEditing = (e) => {
        setEditContent(e.target.value)
    }
    const onClickSaveButton = () => {
        onEdit(id, editContent);
        setIsEditing(false);
    }

    const daysLeft = Math.ceil((new Date(dueDate) - new Date()) / (1000 * 60 * 60 * 24));
    const getPriority = () => {
        if (dueDate == null) {
            return "none"
        }
        else if (daysLeft <= 3) {
            return "urgent"
        } else if (daysLeft <= 7) {
            return "warning"
        } else {
            return "safe"
        }
    }

    return (
        <div className="ToDoItem">
            <input
                onChange={onChangeCheckBox}
                checked={isDone}
                type="checkbox"></input>
            {isEditing ? (
                <input className='editing'
                    value={editContent}
                    onChange={onEditing}></input>
            ) : (
                <div className="content">{content}</div>
            )}
            <div className={getPriority()}>
                <div className="circle"></div>
            </div>
            {dueDate && (
                <div className="date">
                    {new Date(dueDate).toLocaleDateString()}
                </div>
            )}

            {isEditing ? (
                <button onClick={onClickSaveButton}
                >Save</button>
            ) : (
                <button onClick={onClickEditButton}
                >Edit</button>
            )}
            <button onClick={onClickDeleteButton}
            >Delete</button>
        </div>
    )
}

export default ToDoItem;