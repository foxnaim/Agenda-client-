import Navigation from '@/app/components/SideBar/Navigation'
import AgendaTask from '@/app/components/tasks/TaskMenu/page'
import Time from '@/app/components/Time'
import React from 'react'

type Props = {}

const TaskDashboard  = (props: Props) => {
  return (
   <React.Fragment>
    <Navigation/>
    <div>
     <div>{/*Dashboard*/}</div>
     <div>
      <div>
       {/*Time*/}
       <Time/>
      </div>
      <div>{/*Task*/}</div>
     </div>
    </div>
   </React.Fragment>
  )
}

export default TaskDashboard
