import './App.css'
import { useState, useRef, useEffect } from 'react'
import Header from './components/Header'
import Editor from './components/Editor'
import List from './components/List'

function App() {
    const [todos, setTodos] = useState(() => {
        const data = localStorage.getItem('TODOLIST');
        if (data) {
            return JSON.parse(data);
        }
        return [];
    });

    const idRef = useRef(0);

    useEffect(() => {
        window.localStorage.setItem('TODOLIST', JSON.stringify(todos));
    }, [todos])

    const onCreate = (content, dueDate) => {
        const newTask = {
            id: idRef.current++,
            isDone: false,
            content: content,
            dueDate: dueDate ? new Date(dueDate) : null,
        }
        setTodos([newTask, ...todos])
    }

    const onUpdate = (targetId) => {
        setTodos(todos.map((todo) => {
            if (todo.id == targetId) {
                return {
                    ...todo,
                    isDone: !todo.isDone
                }
            }
            return todo
        }))
    }

    const onDelete = (targetId) => {
        setTodos(todos.filter((todo) => {
            if (todo.id !== targetId)
                return todo
        }))
    }

    const onEdit = (targetId, newContent) => {
        setTodos(todos.map((todo) => {
            if (todo.id == targetId) {
                return {
                    ...todo,
                    content: newContent
                    //todo.dueDate = newDate
                }
            }
            return todo
        }))
    }

    return (
        <div className='App'>
            <Header />
            <Editor onCreate={onCreate} />
            <List
                todos={todos}
                onUpdate={onUpdate}
                onDelete={onDelete}
                onEdit={onEdit}
                 />
        </div>
    )
}

export default App
