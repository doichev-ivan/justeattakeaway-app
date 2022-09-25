import React from 'react'
import { IErrorMessage } from '../../../../../api/socket/SocketTypes'
import SystemMessage from './SystemMessage'

interface Props {
  message: IErrorMessage
}

const ErrorMessage: React.FC<Props> = ({ message }: Props) => {
  return (
    <SystemMessage msg={message.message} error={true}/>
  )
}

export default ErrorMessage
