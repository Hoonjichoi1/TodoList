import './Editor.css'
import { useState, useRef } from 'react'

const Editor = ({ onCreate }) => {
    const [content, setContent] = useState("");
    const contentRef = useRef();

    const onChangeContent = (e) => {
        setContent(e.target.value);
    }
    const onSubmit = () => {
        if (content === "") {
            contentRef.current.focus()
            return;
        }
        onCreate(content);
        setContent("");
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
            <button
                onClick={onSubmit}>
                Add
            </button>
        </div>
    )
}

export default Editor;