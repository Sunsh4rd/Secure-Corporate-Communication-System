import { create } from 'zustand'

export const useTaskStore = create((set) => ({
    tasks: [],
    openModal: false,
    setTasks: (tasks) => set(() => ({tasks: tasks})),
    setOpenModal: (open) => set(() => ({openModal: open}))
}))
