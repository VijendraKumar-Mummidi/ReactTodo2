import React, { useEffect, useState } from 'react'

export default function TodoForm({ onAdd, editing, onUpdate, onCancel }){
  const [task, setTask] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [error, setError] = useState('')

  useEffect(()=>{
    if(editing){
      setTask(editing.task || '')
      setDueDate(editing.dueDate || '')
      setError('')
    } else {
      setTask('')
      setDueDate('')
      setError('')
    }
  },[editing])

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    if(!task.trim()){
      setError('Task name cannot be empty.')
      return
    }

    if(dueDate){
      const selected = new Date(dueDate)
      const today = new Date()
      today.setHours(0,0,0,0)
      if(selected < today){
        setError('Due date cannot be in the past.')
        return
      }
    }

    if(editing){
      onUpdate(editing.id, { task: task.trim(), dueDate })
      onCancel()
    } else {
      const newTodo = {
        id: Date.now(),
        task: task.trim(),
        dueDate,
        completed: false
      }
      onAdd(newTodo)
      setTask('')
      setDueDate('')
    }
  }

  return (
    <form className="bg-white p-4 rounded shadow mb-6" onSubmit={handleSubmit}>
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          className="flex-1 p-2 border rounded focus:outline-none"
          placeholder="Task name"
          value={task}
          onChange={(e)=>setTask(e.target.value)}
        />
        <input
          type="date"
          className="p-2 border rounded"
          value={dueDate}
          onChange={(e)=>setDueDate(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">
          {editing ? 'Update' : 'Add'}
        </button>
        {editing && (
          <button type="button" className="bg-gray-200 px-3 py-2 rounded" onClick={onCancel}>Cancel</button>
        )}
      </div>
      {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
    </form>
  )
}
