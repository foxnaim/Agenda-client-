import Link from 'next/link'
import React from 'react'
type Props = {
 h1: string,
 button: string,
}

const Header = (props: Props) => {
  return (
    <header className='flex justify-end m-5'>
     <h1 className='text-center text-2xl mt-3 t'>{props.h1}</h1>
     <Link href="../../pages/login/"><button className='flex rounded-xl p-2'>{props.button}</button></Link>
    </header>
  )
}
export default Header
