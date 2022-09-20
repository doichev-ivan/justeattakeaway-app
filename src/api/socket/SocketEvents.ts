export enum SocketServerEvents {
  RandomNumber = 'randomNumber',
  ActivateYourTurn = 'activateYourTurn',
  GameOver = 'gameOver',
  OnReady = 'onReady',
  Error = 'error',
  Message = 'message',
  ListTrigger = 'listTrigger',
}

export enum SocketClientEvents {
  Login = 'login',
  JoinRoom = 'joinRoom',
  SendNumber = 'sendNumber',
  LeaveRoom = 'leaveRoom',
  LetsPlay = 'letsPlay',
}

export enum SocketDefaultEvents {
  Connect = 'connect',
  ConnectError = 'connect_error',
  Disconnect = 'disconnect',
}
