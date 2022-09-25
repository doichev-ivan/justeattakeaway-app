import React from 'react'
import { ILoginMessage } from '../../../../../api/socket/SocketTypes'
import SystemMessage from './SystemMessage'

interface Props {
  message: ILoginMessage
}

const LoginMessage: React.FC<Props> = ({ message }: Props) => {
  return (
    <SystemMessage msg={message.message}/>
  )
}

export default LoginMessage
