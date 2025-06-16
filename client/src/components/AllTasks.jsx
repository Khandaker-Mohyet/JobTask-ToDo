import React from 'react'
import { useTaskStore } from '../store/useTaskStore';
import { useEffect } from 'react';
import { useAuthStore } from '../Store/useAuthStore';
import { FilePenLine, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const AllTasks = () => {
    const { allData, getTask, deleteTask } = useTaskStore();
    const { authUser } = useAuthStore()
    useEffect(() => {
        getTask();
    }, [getTask]);

    const data = allData?.filter(tasks => tasks.userId === authUser._id);
    console.log(data)
    // filter on category
    const toDoTasks = data.filter(task => task.status === "Todo");
    const inProgressTasks = data.filter(task => task.status === "Inprogress");
    const doneTasks = data.filter(task => task.status === "Completed");

    const handleDelete = (id) => {
        deleteTask(id);
    };

    // const UpdatePage = (id) => {
    //     updatePage(id)
    // }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* To-Do Section */}
            <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-3">To Do</h3>
                {toDoTasks.map(task => (
                    <p
                        key={task._id}
                        className="cursor-pointer"
                    >
                        <div className="bg-gray-700 p-2 mb-2 rounded">
                            <div className='flex justify-between border-b-[1px] '>
                                <div className='text-[16px] pb-1'>{task.title}</div>
                                <div>
                                    {new Date(task.lastDate).toLocaleDateString("en-US", {
                                        day: "2-digit",
                                        month: "long",
                                        timeZone: "Asia/Dhaka"
                                    })}
                                </div>
                                <div className='flex gap-2'>
                                    <button>
                                        <Link to={`/updateTask/${task._id}`} state={{ task }}>
                                    <FilePenLine
                                        className='size-4' />
                                    </Link>
                                    </button>
                                    <button ><Trash2
                                        onClick={() => handleDelete(task._id)}
                                        className='size-4' /></button>
                                </div>
                            </div>
                            <div className='text-[12px] py-1'>{task.description}</div>
                        </div>
                    </p>
                ))}
            </div>

            {/* In Progress Section */}
            <div className="bg-yellow-800 text-white p-4 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-3">In Progress</h3>
                {inProgressTasks.map(task => (
                    <p
                        key={task._id}
                        className="cursor-pointer"
                    >
                        <div className="bg-yellow-700 p-2 mb-2 rounded">
                            <div className='flex justify-between py-1 border-b-[1px]'>
                                <div className='text-[16px]'>{task.title}</div>
                                {new Date(task.lastDate).toLocaleDateString("en-US", {
                                        day: "2-digit",
                                        month: "long",
                                        timeZone: "Asia/Dhaka"
                                    })}
                                <div className='flex gap-2'>
                                    <button>
                                        <Link to={`/updateTask/${task._id}`} state={{ task }}>
                                    <FilePenLine
                                        className='size-4' />
                                    </Link>
                                    </button>
                                    <button ><Trash2
                                        onClick={() => handleDelete(task._id)}
                                        className='size-4' /></button>
                                </div>
                            </div>
                            <div className='text-[12px] py-1'>{task.description}</div>
                        </div>
                    </p>
                ))}
            </div>

            {/* Done Section */}
            <div className="bg-green-800 text-white p-4 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-3">Done</h3>
                {doneTasks.map(task => (
                    <p
                        key={task._id}
                        className="cursor-pointer "
                    >
                        <div className="bg-green-700 p-2 mb-2 rounded">
                            <div className='flex justify-between py-1 border-b-[1px]'>
                                <div className='text-[16px]'>{task.title}</div>
                                {new Date(task.lastDate).toLocaleDateString("en-US", {
                                        day: "2-digit",
                                        month: "long",
                                        timeZone: "Asia/Dhaka"
                                    })}
                                <div className='flex gap-2'>
                                    <button>
                                        <Link to={`/updateTask/${task._id}`} state={{ task }}>
                                    <FilePenLine
                                        className='size-4' />
                                    </Link>
                                    </button>
                                    <button ><Trash2
                                        onClick={() => handleDelete(task._id)}
                                        className='size-4' /></button>
                                </div>
                            </div>
                            <div className='text-[12px] py-1'>{task.description}</div>
                        </div>
                    </p>
                ))}
            </div>
        </div>
    )
}

export default AllTasks