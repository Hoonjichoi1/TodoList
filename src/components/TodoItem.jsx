import './ToDoItem.css'
import { useState, useRef } from 'react'

const ToDoItem = ({ id, isDone, content, dueDate, onUpdate, onDelete, onEdit, onEditDueDate }) => {

    const onChangeCheckBox = () => {
        onUpdate(id);
    }

    const onClickDeleteButton = () => {
        onDelete(id);
    }

    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState("");
    const [editDueDate, setEditDueDate] = useState(dueDate || "");

    const onClickEditButton = () => {
        setIsEditing(true);
        setEditContent(content);
        setEditDueDate(dueDate || "");
    }
    const onClickSaveButton = () => {
        onEdit(id, editContent);
        onEditDueDate(id, editDueDate);
        setIsEditing(false);
    }

    const daysLeft = dueDate ?
        Math.ceil((new Date(dueDate) - new Date()) / (1000 * 60 * 60 * 24))
        :
        null;

    const getPriority = () => {
        if (!dueDate) {
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
                    onChange={(e) => setEditContent(e.target.value)}>
                </input>
            ) : (
                isDone ? (
                    <div className="content_done">{content}</div>
                ) : (
                    <div className="content">{content}</div>
                )
            )}
            <div className={getPriority()}>
                <div className="circle"></div>
            </div>
            {isEditing ? (
                <input
                    type="date"
                    value={editDueDate}
                    onChange={(e) => setEditDueDate(e.target.value)}
                ></input>
            ) : (
                dueDate && (
                    <div className="date">
                        {new Date(dueDate).toLocaleDateString()}
                    </div>
                )
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