import './Editor.css'
import { useState, useRef } from 'react'

const Editor = ({ onCreate }) => {
    const [content, setContent] = useState("");
    const [date, setDate] = useState("");
    const contentRef = useRef();

    const onChangeContent = (e) => {
        setContent(e.target.value);
    }

    const onChangeDate = (e) => {
        setDate(e.target.value);
    }

    const onSubmit = () => {
        if (content === "") {
            contentRef.current.focus()
            return;
        }
        onCreate(content, date);
        setContent("");
        setDate("");
    }
    
    const onKeyDown = (e) => {
        if (e.keyCode == 13) {
            onSubmit();
        }
    }

    return (
        <div className="Editor">
            <input
                ref={contentRef}
                value={content}
                onChange={onChangeContent}
                onKeyDown={onKeyDown}
                placeholder="Enter a new task"></input>
            <input
                value={date}
                onChange={onChangeDate}
                type="date"
            />
            <button
                onClick={onSubmit}>
                Add
            </button>
        </div>
    )
}

export default Editor;