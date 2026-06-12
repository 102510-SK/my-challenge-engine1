export interface Task {
  id: number | string
  title: string
  description: string
  priority: string
  completed: boolean
  category?: string
  tags?: string[]
  dueDate?: string
}

export const ADD_TASK = 'ADD_TASK'
export const UPDATE_TASK = 'UPDATE_TASK'
export const DELETE_TASK = 'DELETE_TASK'
export const TOGGLE_TASK = 'TOGGLE_TASK'
export const SET_TASKS = 'SET_TASKS'

export type Action =
  | { type: typeof ADD_TASK; payload: Task }
  | { type: typeof UPDATE_TASK; payload: Partial<Task> & { id: number | string } }
  | { type: typeof DELETE_TASK; payload: number | string }
  | { type: typeof TOGGLE_TASK; payload: number | string }
  | { type: typeof SET_TASKS; payload: Task[] }

export function taskReducer(state: Task[], action: Action): Task[] {
  switch (action.type) {
    case ADD_TASK:
      return [...state, action.payload]
    case UPDATE_TASK:
      return state.map(t => t.id === action.payload.id ? { ...t, ...action.payload } : t)
    case DELETE_TASK:
      return state.filter(t => t.id !== action.payload)
    case TOGGLE_TASK:
      return state.map(t => t.id === action.payload ? { ...t, completed: !t.completed } : t)
    case SET_TASKS:
      return action.payload
    default:
      return state
  }
}

export const addTask = (task: Task) => ({ type: ADD_TASK as typeof ADD_TASK, payload: task })
export const updateTask = (id: number | string, updates: Partial<Task>) => ({ type: UPDATE_TASK as typeof UPDATE_TASK, payload: { ...updates, id } })
export const deleteTask = (id: number | string) => ({ type: DELETE_TASK as typeof DELETE_TASK, payload: id })
export const toggleTask = (id: number | string) => ({ type: TOGGLE_TASK as typeof TOGGLE_TASK, payload: id })
export const setTasks = (tasks: Task[]) => ({ type: SET_TASKS as typeof SET_TASKS, payload: tasks })