import { loginActions, selectUsername } from '../pages/login/loginSlice'
import { SocketServerEvents, SocketClientEvents } from '../api/socket/SocketEvents'
import SocketClient from '../api/socket/SocketClient'
import { LoginMessage } from '../api/socket/SocketTypes'
import { REHYDRATE } from 'redux-persist'

// @ts-expect-error
const socketMiddleware = (socket: SocketClient) => store => next => action => {
  if (action.type === REHYDRATE) {
    const username = selectUsername(action.payload)
    if (username !== null) socket.init(() => socket.emit(SocketClientEvents.Login, { username }))
  }

  if (loginActions.loginStart.match(action)) {
    socket.init(() => socket.emit(SocketClientEvents.Login, { username: action.payload.username }))
    socket.on(SocketServerEvents.Message, (message: LoginMessage) => {
      console.log('message', message)
      if (message.socketId !== '') {
        store.dispatch(loginActions.loginEnd({ username: message.user }))
      }
    })
  }

  if (loginActions.loginOut.match(action)) {
    socket.disconnect()
  }

  next(action)
}

export default socketMiddleware
