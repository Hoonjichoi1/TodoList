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
            dueDate: dueDate || "",
        }
        setTodos([newTask, ...todos].sort((a, b) => {
            if (!a.dueDate) return 1;
            if (!b.dueDate) return -1;
            return new Date(a.dueDate) - new Date(b.dueDate);
        }))
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
        setTodos(todos.filter((todo) =>
            todo.id !== targetId))
    }

    const onEdit = (targetId, newContent) => {
        setTodos(todos.map((todo) => {
            if (todo.id == targetId) {
                return {
                    ...todo,
                    content: newContent
                }
            }
            return todo
        }))
    }

    const onEditDueDate = (targetId, newDueDate) => {
        setTodos(todos.map((todo) => {
            if (todo.id == targetId) {
                return {
                    ...todo,
                    dueDate: newDueDate || ""
                }
            }
            return todo
        }))
    }

    return (
        <div className='App'>
            <Header />
            <Editor
                onCreate={onCreate}
            />
            <List
                todos={todos}
                onUpdate={onUpdate}
                onDelete={onDelete}
                onEdit={onEdit}
                onEditDueDate={onEditDueDate}
            />
        </div>
    )
}

export default App
