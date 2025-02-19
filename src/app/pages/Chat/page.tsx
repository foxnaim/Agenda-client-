import Header from '@/app/components/Header/Header'
import Navigation from '@/app/components/NavBar/Navigation'
import React from 'react'

type Props = {}

const Chat = (props: Props) => {
  return (
<React.Fragment>
 <Header h1="Agenda"/>
 <Navigation/>
</React.Fragment>
  )
}
export default Chat
