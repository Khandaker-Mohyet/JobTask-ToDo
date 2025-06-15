import React from 'react'
import { useTaskStore } from '../store/useTaskStore';
import { useEffect } from 'react';
import { useAuthStore } from '../Store/useAuthStore';

const AllTasks = () => {
    const { allData, getTask } = useTaskStore();
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

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* To-Do Section */}
        <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-3">To Do</h3>
          {toDoTasks.map(task => (
            <p 
              key={task._id} 
              className="cursor-pointer hover:text-green-400" 
            //   onClick={() => fetchTaskDetails(task._id)}
            >
              <div className="bg-gray-700 p-2 mb-2 rounded">{task.title}</div>
            </p>
          ))}
        </div>

        {/* In Progress Section */}
        <div className="bg-yellow-800 text-white p-4 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-3">In Progress</h3>
          {inProgressTasks.map(task => (
            <p 
              key={task._id} 
              className="cursor-pointer hover:text-green-400" 
            //   onClick={() => fetchTaskDetails(task._id)}
            >
              <div className="bg-yellow-700 p-2 mb-2 rounded">{task.title}</div>
            </p>
          ))}
        </div>

        {/* Done Section */}
        <div className="bg-green-800 text-white p-4 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-3">Done</h3>
          {doneTasks.map(task => (
            <p 
              key={task._id} 
              className="cursor-pointer hover:text-green-400" 
            //   onClick={() => fetchTaskDetails(task._id)}
            >
              <div className="bg-green-700 p-2 mb-2 rounded">{task.title}</div>
            </p>
          ))}
        </div>
      </div>
    )
}

export default AllTasks