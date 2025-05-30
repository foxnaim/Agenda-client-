import MonthsDashboard from '@/app/components/Dashboard/Dashboard12'
import Navigation from '@/app/components/SideBar/Navigation'
import AgendaTask from '@/app/components/tasks/TaskMenu/page'
import Time from '@/app/components/Time'
import React from 'react'



const TaskDashboard  = () => {
  return (
   <React.Fragment>
    <Navigation/>
    <div className='flex flex-row justify-between items-center bg-gradient-to-br from-deepViolet via-royalAubergine to-black'>
     <div className='block ml-[250px] mt-5'>
    <MonthsDashboard/>
     </div>
     <div className='block mr-3'>
      <div><Time/></div>
      <div><AgendaTask/></div>
     </div>
    </div>
   </React.Fragment>
  )
}

export default TaskDashboard
