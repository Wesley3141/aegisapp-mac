/* eslint-disable prettier/prettier */
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTasks } from './store/useTasks'
import './ToDoList.css'

interface Task {
  text: string
  completed: boolean
}

const ToDoList = () => {
  const [tasks, setTasks] = useTasks()
  const [taskInput, setTaskInput] = useState('')
  const navigate = useNavigate()

  const handleAddTask = () => {
    if (taskInput.trim()) {
      const newTask: Task = { text: taskInput.trim(), completed: false }
      setTasks((prevTasks) => [...prevTasks, newTask])
      setTaskInput('')
    }
  }

  const handleToggleTask = (index: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, i) => (i === index ? { ...task, completed: !task.completed } : task))
    )
  }

  return (
    <div className="h-screen w-full overflow-hidden flex flex-col bg-transparent">
      <header className="acrylic-header flex justify-between items-center p-4 w-full z-10">
        <button
          onClick={() => navigate('/')}
          className="bg-gray-600 text-gray-100 px-4 py-2 rounded hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          Go Back
        </button>
        <h1 className="text-3xl font-semibold">To-Do List</h1>
      </header>
      <main className="acrylic-main flex flex-col flex-grow p-4 w-full overflow-y-auto">
        <div className="flex mb-4">
          <input
            type="text"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            className="flex-grow bg-gray-700 border border-gray-600 rounded-l-lg py-2 px-4 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-0"
            placeholder="Add a new task"
          />
          <button
            onClick={handleAddTask}
            className="bg-gray-600 text-gray-100 rounded-r-lg px-4 py-2 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Add
          </button>
        </div>
        <ul className="flex-grow list-none p-0 m-0">
          {tasks.map((task, index) => (
            <li
              key={index}
              className={`flex items-center py-2 px-4 border-b border-gray-600 ${task.completed ? 'bg-gray-700' : 'bg-gray-600'}`}
            >
              <label className="custom-checkbox-container">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleTask(index)}
                  className="custom-checkbox"
                />
              </label>
              <span className={`ml-3 ${task.completed ? 'line-through text-gray-500' : ''}`}>
                {task.text}
              </span>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}

export default ToDoList
