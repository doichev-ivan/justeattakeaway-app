import { IMessage } from '../../../../api/socket/SocketTypes'

export enum MessageType {
  Error = 'error',
  Login = 'login',
  JoinRoom = 'joinRoom',
  OnReady = 'onReady',
  RandomNumber = 'randomNumber',
}

export interface Message {
  message: IMessage
  type: MessageType
}
