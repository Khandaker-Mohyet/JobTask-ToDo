import React from 'react'
import TaskInput from '../components/TaskInput'
import AllTasks from '../components/AllTasks'

const HomePage = () => {
  return (
    <div className='mt-20'>
      <TaskInput></TaskInput>
      <AllTasks></AllTasks>
    </div>
  )
}

export default HomePage