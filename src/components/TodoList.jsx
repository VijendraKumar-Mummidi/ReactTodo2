import React, { useMemo, useState } from 'react'
import TodoItem from './TodoItem.jsx'

export default function TodoList({ todos, onEdit, onDelete, onToggle, onUpdate }){
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')
  const [sortByDate, setSortByDate] = useState(false)

  const filtered = useMemo(()=>{
    let list = todos.slice()
    if(query.trim()){
      const q = query.toLowerCase()
      list = list.filter(t => t.task.toLowerCase().includes(q))
    }
    if(filter === 'active') list = list.filter(t => !t.completed)
    if(filter === 'completed') list = list.filter(t => t.completed)
    if(sortByDate){
      list.sort((a,b)=>{
        if(!a.dueDate) return 1
        if(!b.dueDate) return -1
        return new Date(a.dueDate) - new Date(b.dueDate)
      })
    }
    return list
  },[todos, query, filter, sortByDate])

  return (
    <section>
      <div className="flex flex-col sm:flex-row gap-2 mb-4 items-center">
        <input
          className="flex-1 p-2 border rounded"
          placeholder="Search tasks..."
          value={query}
          onChange={(e)=>setQuery(e.target.value)}
        />
        <select className="p-2 border rounded" value={filter} onChange={(e)=>setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={sortByDate} onChange={(e)=>setSortByDate(e.target.checked)} />
          Sort by due date
        </label>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center text-gray-500 p-6 bg-white rounded shadow">No tasks yet</div>
      ) : (
        <ul className="flex flex-col gap-3">
          {filtered.map(t => (
            <TodoItem
              key={t.id}
              todo={t}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggle={onToggle}
            />
          ))}
        </ul>
      )}
    </section>
  )
}
