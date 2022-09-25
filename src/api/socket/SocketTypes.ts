export interface ILoginMessage {
  user: string
  message: string
  socketId: string
}

export interface IJoinRoomMessage {
  user: string
  message: string
  room: string
}

export interface IErrorMessage {
  message: string
}

export interface IOnReadyMessage {
  state: boolean
}

export interface IRandomNumberMessage {
  number: string | number
  isFirst: boolean
  user: string
  selectedNumber: number
  isCorrectResult: boolean
}

export interface IActivateYourTurnMessage {
  user: string
  state: string
}

export interface IGameOverMessage {
  user: string
  isOver: boolean
}

export type IMessage = ILoginMessage | IJoinRoomMessage | IErrorMessage | IOnReadyMessage | IRandomNumberMessage
