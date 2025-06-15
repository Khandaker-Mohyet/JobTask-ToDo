import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useTaskStore = create((set, get) => ({

    taskData: null,
    isPostTask: false,
    allData: [],

    postTask: async (data) => {
        set({ isPostTask: true });
        try {
            const res = await axiosInstance.post("/tasks", data);
            set((state) => ({
                allData: [res.data, ...state.allData],
                taskData: res.data
            }));
            toast.success("Task created successfully");
        } catch (error) {
            toast.error(error.response?.data?.message || "Task creation failed");
        } finally {
            set({ isPostTask: false });
        }
    },

    getTask: async () => {
        try {
            const res = await axiosInstance.get("/tasks")
            set({ allData: res.data });
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },

    deleteTask: async (taskId) => {
  try {
    await axiosInstance.delete(`/tasks/${taskId}`);
    set((state) => ({
      allData: state.allData.filter(task => task._id !== taskId)
    }));
    toast.success("Task deleted");
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to delete task");
  }
}
}))