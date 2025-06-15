import React from 'react'
import TaskInput from '../components/TaskInput'
import AllTasks from '../components/AllTasks'

const HomePage = () => {
  return (
    <div className='py-16 h-svh'>
      <TaskInput></TaskInput>
      <AllTasks></AllTasks>
    </div>
  )
}

export default HomePage