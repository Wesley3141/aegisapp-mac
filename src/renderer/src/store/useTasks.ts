/* eslint-disable prettier/prettier */
import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { tasksAtom } from './index'
import { Task } from './types'; // Import the Task interface

const LOCAL_STORAGE_KEY = 'tasks'

export const useTasks = () => {
  const [tasks, setTasks] = useAtom(tasksAtom)

  useEffect(() => {
    const savedTasks = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (savedTasks) {
      try {
        const parsedTasks: Task[] = JSON.parse(savedTasks)
        setTasks(parsedTasks)
      } catch (error) {
        console.error('Failed to parse tasks from local storage', error)
      }
    }
  }, [setTasks])

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks))
    } catch (error) {
      console.error('Failed to save tasks to local storage', error)
    }
  }, [tasks])

  return [tasks, setTasks] as const
}
