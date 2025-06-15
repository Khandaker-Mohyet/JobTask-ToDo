import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useTaskStore = create((set) => ({

    taskData: null,
    isPostTask: false,

    postTask: async (data) => {
        set({ isPostTask: true })
        try {
            const res = await axiosInstance.post("/tasks", data)
            set({ taskData: res.data })
            toast.success("Task created successfully")
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({ isPostTask: false });
        }
    }
}))