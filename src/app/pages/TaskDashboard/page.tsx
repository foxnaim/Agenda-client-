import Navigation from '@/app/components/SideBar/Navigation'
import AgendaTask from '@/app/components/tasks/TaskMenu/page'
import Time from '@/app/components/Time'
import React from 'react'

type Props = {}

const TaskDashboard  = (props: Props) => {
  return (
   <React.Fragment>
    <Navigation/>
    <div className='flex flex-row justify-end items-center gap-4'>
     <div>slfxvndrfolvubrkvjberkvb</div>
     <div>
      <div><Time/></div>
      <div><AgendaTask/></div>
     </div>
    </div>
   </React.Fragment>
  )
}

export default TaskDashboard
