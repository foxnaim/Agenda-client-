import React from 'react'

type Props = {
 h1: string,
}

const Header = (props: Props) => {
  return (
    <header>
     <h1 className='text-center text-2xl mt-3'>{props.h1}</h1>
    </header>
  )
}
export default Header
