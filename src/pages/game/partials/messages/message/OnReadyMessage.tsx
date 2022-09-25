import React from 'react'
import { IOnReadyMessage } from '../../../../../api/socket/SocketTypes'
import SystemMessage from './SystemMessage'

interface Props {
  message: IOnReadyMessage
}

const OnReadyMessage: React.FC<Props> = ({ message }: Props) => {
  const msg = `Room is ${message.state ? '' : 'not '}ready`
  return (
    <SystemMessage msg={msg}/>
  )
}

export default OnReadyMessage
