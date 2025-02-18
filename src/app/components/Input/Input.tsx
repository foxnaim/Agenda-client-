import React from 'react'
import { IconType } from 'react-icons'

type Props = {
  type: string;
  name: string;
  placeholder: string;
  Icon?: IconType;  
}

function Input(props: Props) {
  return (
    <div className='flex items-center'>
      {props.Icon && <props.Icon className="text-gray-400 mr-2 text-2xl" />}
      
      <input 
        type={props.type} 
        name={props.name} 
        placeholder={props.placeholder} 
        className="border-b-2 border-gray-300 w-full outline-none bg-transparent text-white placeholder:text-gray-300"
      />
    </div>
  )
}

export default Input
