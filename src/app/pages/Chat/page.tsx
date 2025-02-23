import React from 'react'
import Header from '@/app/components/Header/Header'
import Navigation from '@/app/components/SideBar/Navigation'
import AI from '@/app/components/AI/AI'



const Chat = () => {
  return (
    <React.Fragment>
      <Header h1="Agenda"/>
      <Navigation/>
      
      {/* Контейнер для выравнивания по центру */}
      <div className="flex flex-col items-center justify-center mt-[250px] text-center">
        <h1 className="text-4xl font-semibold text-white">Hi, I’m Agenda</h1>
        <p className=" mt-2 ">
          Ready to get started?
        </p>
        
        {/* Чат-компонент */}
        <AI />
      </div>
    </React.Fragment>
  )
}

export default Chat

