import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../Store/useAuthStore';
import { useTaskStore } from '../store/useTaskStore';

const TaskInput = () => {

    const { authUser } = useAuthStore();
    const { postTask } = useTaskStore();

    const [formData, setFormData] = useState({
        title: "",
        status: "",
        description: "",
        userId:authUser._id
    })
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        postTask(formData)
        console.log(formData)
    }


    return (
        <div>
            <div className="max-w-md border-2 border-green-500 rounded-lg shadow-lg bg-white p-6 mx-auto">
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        {/* First step */}
                        <div className="flex flex-col md:flex-row gap-4">
                            <input
                                type="text"
                                name="title"
                                required
                                placeholder="Title"
                                className="input input-bordered input-success w-full p-3 rounded-lg border-2 border-green-400"
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            />
                            <select name="status" required className="select select-bordered select-success w-full p-3 rounded-lg border-2 border-green-400"
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                            >
                                <option disabled selected>status</option>
                                <option>Todo</option>
                                <option>Inprogress</option>
                                <option>Completed</option>
                            </select>

                        </div>
                        {/* Second step */}
                        <div className="flex flex-col md:flex-row gap-4">
                            <input
                                type="text"
                                name="description"
                                placeholder="Description"
                                className="input input-bordered input-success w-full p-3 rounded-lg border-2 border-green-400"
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                            <button className="btn btn-success w-full md:w-auto px-6 py-3 text-white font-semibold rounded-lg hover:bg-green-700 transition-all">
                                Add Task
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <div className="text-center">
            </div>
        </div>
    );
}

export default TaskInput