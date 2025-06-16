import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../Store/useAuthStore';
import { useTaskStore } from '../store/useTaskStore';
import { Calendar } from 'lucide-react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TaskInput = () => {

    const { authUser } = useAuthStore();
    const { postTask } = useTaskStore();
    const [startDate, setStartDate] = useState(null);

    const [formData, setFormData] = useState({
        title: "",
        status: "",
        description: "",
        userId: authUser._id,
        lastDate: null
    })


    const handleSubmit = async (e) => {
        e.preventDefault();
        postTask(formData)
        console.log(formData)
        setFormData({
            title: "",
            status: null,
            description: "",
            userId: authUser._id,
            lastDate: null
        });
        setStartDate(null);
    }


    return (
        <div>
            <div className="max-w-md rounded-lg shadow-lg p-4 mx-auto">
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        {/* First step */}
                        <div className="flex flex-col md:flex-row gap-4">
                            <input
                                type="text"
                                name="title"
                                required
                                placeholder="Title"
                                className="input input-bordered input-sm w w-full p-3 rounded-lg border-2"
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                value={formData.title}
                            />
                            <select
                                name="status"
                                required
                                className="select select-bordered select-sm w-full rounded-lg border-2"
                                value={formData.status || ""}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                            >
                                <option value="" disabled>
                                    status
                                </option>
                                <option value="Todo">Todo</option>
                                <option value="Inprogress">Inprogress</option>
                                <option value="Completed">Completed</option>
                            </select>

                            <button className="btn btn-sm w-full md:w-auto px-6  font-semibold rounded-lg transition-all">
                                Add Task
                            </button>

                        </div>
                        {/* Second step */}
                        <div className="flex flex-col md:flex-row gap-4">
                            <input
                                type="text"
                                name="description"
                                placeholder="Description"
                                className="input input-bordered input-sm w w-full p-3 rounded-lg border-2"
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                value={formData.description}
                            />
                            <div className="">
                                <DatePicker
                                    selected={startDate}
                                    name="lastDate"
                                    placeholderText="Last Date"
                                    onChange={(date) => {
                                        setStartDate(date);
                                        setFormData({ ...formData, lastDate: date });
                                    }}
                                    className="input input-bordered input-sm w-full p-3 rounded-lg border-2"
                                />
                            </div>
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