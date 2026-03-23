import './App.css'
import { useState, useRef, useEffect } from 'react'
import Header from './components/Header'
import Editor from './components/Editor'
import List from './components/List'
import { collection, query, onSnapshot, updateDoc, addDoc, deleteDoc, doc } from 'firebase/firestore'
import { db } from './firebase'

function App() {
    const [todos, setTodos] = useState([]);

    const idRef = useRef(0);

    const onCreate = async (content, dueDate) => {
            await addDoc(collection(db, 'todos'), {
                id: idRef.current++,
                content: content,
                isDone: false,
                dueDate: dueDate || "",
            })
    }

    const onDelete = async (targetId) => {
        await deleteDoc (doc (db, 'todos', targetId))
    }

    const onEditStatus = async (targetId) => {
        await updateDoc(doc(db, 'todos', targetId), {
            isDone: !todos.find(t => t.id === targetId).isDone

        })
    }

    const onEditContent = async (targetId, newContent) => {
        await updateDoc(doc(db, 'todos', targetId), {
            content: newContent
        })
    }

    const onEditDueDate = async (targetId, newDueDate) => {
        await updateDoc(doc(db, 'todos', targetId), {
            dueDate: newDueDate || ""
        })
    }

    // read data from firebase
    useEffect(() => {
        const q = query(collection(db, 'todos'))
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let todosArr = []
            querySnapshot.forEach((doc) => {
                todosArr.push({
                    ...doc.data(),
                    id: doc.id,
                    dueDate: doc.data().dueDate || null
                })
            })
            setTodos(todosArr.sort((a, b) => {
                if (!a.dueDate) return 1;
                if (!b.dueDate) return -1;
                return new Date(a.dueDate) - new Date(b.dueDate);
            }))
        })
        return () => unsubscribe
    }, [])

    return (
        <div className='App'>
            <Header />
            <Editor
                onCreate={onCreate}
            />
            <List
                todos={todos}
                onDelete={onDelete}
                onUpdate={onEditStatus}
                onEdit={onEditContent}
                onEditDueDate={onEditDueDate}
            />
        </div>
    )
}

export default App
