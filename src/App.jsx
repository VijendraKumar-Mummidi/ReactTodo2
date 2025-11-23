import React, { useState, useEffect } from 'react'
import TodoForm from './components/TodoForm.jsx'
import TodoList from './components/TodoList.jsx'

const LOCAL_KEY = 'pod_todos_v1'

export default function App() {

  const [todos, setTodos] = useState([])
  const [editing, setEditing] = useState(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LOCAL_KEY)
      if (raw) setTodos(JSON.parse(raw))
    } catch (e) {
      console.error("Failed to load from localStorage", e)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(todos))
  }, [todos])

  const addTodo = (todo) => {
    setTodos(prev => [todo, ...prev])
  }

  const updateTodo = (id, updated) => {
    setTodos(prev =>
      prev.map(t => t.id === id ? { ...t, ...updated } : t)
    )
  }

  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(t => t.id !== id))
  }

  const toggleComplete = (id) => {
    setTodos(prev =>
      prev.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    )
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <header className="text-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Todo List </h1>
      </header>

      <TodoForm
        onAdd={addTodo}
        editing={editing}
        onUpdate={updateTodo}
        onCancel={() => setEditing(null)}
      />

      <TodoList
        todos={todos}
        onEdit={(t) => setEditing(t)}
        onDelete={deleteTodo}
        onToggle={toggleComplete}
        onUpdate={updateTodo}
      />

      <footer className="mt-8 text-center text-xs text-gray-500">
        Built with React by Vijendra Kumar all right own me and The Twwios Technologies Interview Team because you gave me this project
      </footer>
    </div>
  )
}
