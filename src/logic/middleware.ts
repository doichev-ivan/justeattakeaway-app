import { appActions, AppMessage } from './slice'
import SocketEvents from '../api/socket/SocketEvents'
import SocketClient from '../api/socket/SocketClient'

// @ts-expect-error
const middleware = (socket: SocketClient) => store => next => action => {
  const isConnectionEstablished = socket !== null && store.getState().app.isConnected

  if (appActions.startConnecting.match(action)) {
    socket.connect()
    socket.on('connect', () => {
      store.dispatch(appActions.connectionEstablished())
      socket.emit(SocketEvents.Login, { username: 'Ivan' })
    })

    socket.on(SocketEvents.Message, (message: AppMessage) => {
      console.log('message', message)
      store.dispatch(appActions.receiveMessage({ message }))
    })
  }

  if (appActions.submitMessage.match(action) && (Boolean(isConnectionEstablished))) {
    socket.emit(SocketEvents.RandomNumber, action.payload.content)
  }

  return next(action)
}

export default middleware
