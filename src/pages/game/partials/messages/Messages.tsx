import React from 'react'
import { useAppSelector } from '../../../../logic/hooks'
import { selectMessages } from './messagesSlice'
import LoginMessage from './message/LoginMessage'
import JoinRoomMessage from './message/JoinRoomMessage'
import { Message, MessageType } from './MessageTypes'
import {
  IErrorMessage,
  IJoinRoomMessage,
  ILoginMessage,
  IOnReadyMessage,
  IRandomNumberMessage
} from '../../../../api/socket/SocketTypes'
import ErrorMessage from './message/ErrorMessage'
import OnReadyMessage from './message/OnReadyMessage'
import RandomNumberMessage from './message/RandomNumberMessage'

const Messages: React.FC = () => {
  const messages = useAppSelector(selectMessages)
  const handleMessage = React.useCallback((m: Message) => {
    switch (m.type) {
      case MessageType.Login:{
        return <LoginMessage message={m.message as ILoginMessage}/>
      }
      case MessageType.JoinRoom:{
        return <JoinRoomMessage message={m.message as IJoinRoomMessage}/>
      }
      case MessageType.Error:{
        return <ErrorMessage message={m.message as IErrorMessage}/>
      }
      case MessageType.OnReady:{
        return <OnReadyMessage message={m.message as IOnReadyMessage}/>
      }
      case MessageType.RandomNumber:{
        return <RandomNumberMessage message={m.message as IRandomNumberMessage}/>
      }
      default:{
        return null
      }
    }
  }, [])
  return (
  <>
    {messages.map((m, i) => <div key={i}>{handleMessage(m)}</div>)}
  </>
  )
}

export default Messages
