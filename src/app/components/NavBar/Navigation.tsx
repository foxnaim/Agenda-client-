import React from 'react'



const Navigation = () => {
  return (
      <React.Fragment>
    <nav className="fixed left-0 top-1/2 -translate-y-1/2 flex flex-col justify-center items-start p-4 bg-dop w-[50px] h-[350px] rounded-r-3xl hover:w-[200px] duration-300">
      <ul className="text-white overflow-hidden grid gap-4">
      <li className="flex items-center gap-2 ">
          <span>⚙️</span> <span className='opacity-0 hover:opacity-100 duration-300'>Settings</span>
        </li>
        <li className="flex items-center gap-2 ">
          <span>⚙️</span> <span className='opacity-0 hover:opacity-100 duration-300'>Settings</span>
        </li>
        <li className="flex items-center gap-2 ">
          <span>⚙️</span> <span className='opacity-0 hover:opacity-100 duration-300'>Settings</span>
        </li>
        <li className="flex items-center gap-2 ">
          <span>⚙️</span> <span className='opacity-0 hover:opacity-100 duration-300'>Settings</span>
        </li>
        <li className="flex items-center gap-2 ">
          <span>⚙️</span> <span className='opacity-0 hover:opacity-100 duration-300'>Settings</span>
        </li>
      </ul>
    </nav>
      
      </React.Fragment>
  )
}

export default Navigation
