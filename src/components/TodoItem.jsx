import React from 'react'

export default function TodoItem({ todo, onEdit, onDelete, onToggle }){
  return (
    <li className="bg-white p-3 rounded shadow flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <input type="checkbox" checked={todo.completed} onChange={()=>onToggle(todo.id)} />
        <div>
          <div className={"font-medium " + (todo.completed ? 'line-through text-gray-400' : '')}>
            {todo.task}
          </div>
          <div className="text-xs text-gray-500">
            {todo.dueDate ? `Due: ${todo.dueDate}` : 'No due date'}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="text-sm px-2 py-1 bg-yellow-100 rounded" onClick={()=>onEdit(todo)}>Edit</button>
        <button className="text-sm px-2 py-1 bg-red-100 rounded" onClick={()=>onDelete(todo.id)}>Delete</button>
      </div>
    </li>
  )
}
