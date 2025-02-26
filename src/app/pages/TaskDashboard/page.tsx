import MonthsDashboard from '@/app/components/Dashboard/Dashboard12'
import DashboardTask from '@/app/components/Dashboard/DashboardTask'
import Navigation from '@/app/components/SideBar/Navigation'
import AgendaTask from '@/app/components/tasks/TaskMenu/page'
import Time from '@/app/components/Time'
import React from 'react'



const TaskDashboard  = () => {
  return (
   <React.Fragment>
    <Navigation/>
    <div className='flex flex-row justify-end items-center gap-4'>
     <div>
    <MonthsDashboard/>
     </div>
     <div>
      <div><Time/></div>
      <div><AgendaTask/></div>
     </div>
    </div>
   </React.Fragment>
  )
}

export default TaskDashboard
