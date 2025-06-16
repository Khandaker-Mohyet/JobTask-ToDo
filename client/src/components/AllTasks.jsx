import React, { useEffect, useState } from 'react';
import { useTaskStore } from '../store/useTaskStore';
import { useAuthStore } from '../store/useAuthStore.js';
import { FilePenLine, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const AllTasks = () => {
    const { allData, getTask, deleteTask, updateTask } = useTaskStore();
    const { authUser } = useAuthStore();

    const [tasksByStatus, setTasksByStatus] = useState({
        Todo: [],
        Inprogress: [],
        Completed: []
    });

    useEffect(() => {
        getTask();
    }, [getTask]);

    useEffect(() => {
        const data = allData?.filter(task => task.userId === authUser._id);
        setTasksByStatus({
            Todo: data.filter(task => task.status === 'Todo'),
            Inprogress: data.filter(task => task.status === 'Inprogress'),
            Completed: data.filter(task => task.status === 'Completed')
        });
    }, [allData, authUser]);

    const handleDelete = (id) => {
        deleteTask(id);
    };

    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result;
        if (!destination) return;

        const sourceColumn = source.droppableId;
        const destColumn = destination.droppableId;

        // Same column reordering
        if (sourceColumn === destColumn) {
            const newTasks = Array.from(tasksByStatus[sourceColumn]);
            const [movedTask] = newTasks.splice(source.index, 1);
            newTasks.splice(destination.index, 0, movedTask);

            setTasksByStatus({
                ...tasksByStatus,
                [sourceColumn]: newTasks
            });
            return;
        }

        // Cross column move
        const sourceTasks = Array.from(tasksByStatus[sourceColumn]);
        const destTasks = Array.from(tasksByStatus[destColumn]);
        const [movedTask] = sourceTasks.splice(source.index, 1);
        movedTask.status = destColumn;
        destTasks.splice(destination.index, 0, movedTask);

        setTasksByStatus({
            ...tasksByStatus,
            [sourceColumn]: sourceTasks,
            [destColumn]: destTasks
        });

        updateTask(draggableId, { status: destColumn });
    };

    const renderTasks = (tasks, statusColor) => (
        tasks.map((task, index) => (
            <Draggable draggableId={task._id} index={index} key={task._id}>
                {(provided) => (
                    <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        className={`bg-${statusColor}-700 p-2 mb-2 border-2 rounded`}
                    >
                        <div className='flex justify-between border-b-[1px]'>
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
                                        <FilePenLine className='size-4' />
                                    </Link>
                                </button>
                                <button onClick={() => handleDelete(task._id)}>
                                    <Trash2 className='size-4' />
                                </button>
                            </div>
                        </div>
                        <div className='text-[12px] py-1'>{task.description}</div>
                    </div>
                )}
            </Draggable>
        ))
    );

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className='container mx-auto px-4 py-8 h-svh'>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {['Todo', 'Inprogress', 'Completed'].map((section) => (
                        <Droppable droppableId={section} key={section}>
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className={`border-t-2 p-4 rounded-lg shadow-lg`}
                                >
                                    <h3 className="text-xl font-semibold mb-3 text-center">
                                        {section === 'Inprogress' ? 'In Progress' : section === 'Completed' ? 'Completed' : 'ToDo'}
                                    </h3>
                                    {renderTasks(tasksByStatus[section], section === 'Todo' ? 'gray' : section === 'Inprogress' ? 'yellow' : 'green')}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    ))}
                </div>
            </div>
        </DragDropContext>
    );
};

export default AllTasks;