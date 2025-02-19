import React from 'react'

type Props = {}

const Navigation = (props: Props) => {
  return (
  <React.Fragment>
   <nav>
     <ul className="flex flex-col justify-center align-center text-white p-4">
       <li>Home</li>
       <li>Chat</li>
       <li>Settings</li>
     </ul>
   </nav>
  </React.Fragment>
  )
}
export default Navigation
