import './App.css'
import { useState, useRef } from 'react'
import Header from './components/Header'
import Editor from './components/Editor'
import List from './components/List'

function App() {
    const [todos, setTodos] = useState([]);
    const idRef = useRef(0);

    const onCreate = (content) => {
        const newTask = {
            id: idRef.current++,
            isDone: false,
            content: content,
            date: new Date().getTime()
        }

        setTodos([newTask, ...todos])
    }

    return (
        <div className='App'>
            <Header />
            <Editor onCreate={onCreate} />
            <List />
        </div>
    )
}

export default App
