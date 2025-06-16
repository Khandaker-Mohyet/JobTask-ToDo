import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../Store/useAuthStore';
import { useTaskStore } from '../store/useTaskStore';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';

const UpdateTask = () => {

    const navigate = useNavigate();
    const { authUser } = useAuthStore();
    const { updateTask } = useTaskStore();
    const location = useLocation();
    const task = location.state?.task;
    const { _id, userId, title, status, lastDate, description } = task
    console.log(_id, userId, title, status, lastDate, description)


    const [formData, setFormData] = useState({
        title: title,
        status: status,
        description: description,
        userId: authUser._id,
        lastDate: new Date(lastDate),
    })


    const handleUpdate = async (e) => {
        e.preventDefault();
        updateTask(_id, formData)
        console.log(formData)
        navigate('/');
    }


    return (
        <div className='pt-24 h-svh'>
            <div className="max-w-md rounded-lg shadow-lg p-4 mx-auto">
                <form onSubmit={handleUpdate}>
                    <div className="space-y-4">
                        {/* First step */}
                        <div className="flex flex-col md:flex-row gap-4">
                            <input
                                type="text"
                                name="title"
                                required
                                placeholder="Title"
                                defaultValue={title}
                                className="input input-bordered input-sm w w-full p-3 rounded-lg border-2"
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            />
                            <select
                                name="status"
                                required
                                value={formData.status}
                                className="select select-bordered select-sm w-full rounded-lg border-2"
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
                                defaultValue={description}
                                className="input input-bordered input-sm w w-full p-3 rounded-lg border-2"
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}

                            />
                            <div className="">
                                <DatePicker
                                    selected={formData.lastDate}
                                    dateFormat="dd-MM-yyyy"
                                    name="lastDate"
                                    placeholderText="Last Date"
                                    onChange={(date) => {
                                        setFormData({ ...formData, lastDate: date });
                                    }}
                                    className="input input-bordered input-sm w-full p-3 rounded-lg border-2"
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div className="flex justify-center items-center mt-4">
                <Link className='flex' to={"/"}>
                    <button className="justify-center btn btn-sm w-full md:w-auto px-6 font-semibold rounded-lg transition-all">
                        Cancel
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default UpdateTask