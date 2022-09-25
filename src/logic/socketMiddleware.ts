import { loginActions, selectUserid, selectUsername } from '../pages/login/loginSlice'
import {
  roomsActions,
  selectCurrentRoom,
  selectIsCurrentReady,
  selectRooms
} from '../pages/game/partials/rooms/roomsSlice'
import { SocketServerEvents, SocketClientEvents } from '../api/socket/SocketEvents'
import { SocketClient } from '../api/socket/SocketClient'
import {
  IActivateYourTurnMessage,
  IErrorMessage,
  IGameOverMessage,
  IMessage,
  IOnReadyMessage,
  IRandomNumberMessage
} from '../api/socket/SocketTypes'
import { REHYDRATE } from 'redux-persist'
import { messagesActions } from '../pages/game/partials/messages/messagesSlice'
import { MessageType } from '../pages/game/partials/messages/MessageTypes'
import { gameActions, selectCurrentNumber, selectWinner } from '../pages/game/gameSlice'

const socketMiddleware = (socket: SocketClient) => (store: any) => (next: any) => (action: any) => {
  console.log('socketMiddleware action', action)
  if (action.type === REHYDRATE && action.key === 'justeattakeaway-app/login' && action.payload) {
    const username = action.payload.username
    if (username !== null) {
      socket.init(() => socketConnectHandler(store, socket, username))
    }
  }

  if (loginActions.loginStart.match(action)) {
    socket.init(() => socketConnectHandler(store, socket, action.payload.username))
  }

  if (loginActions.logout.match(action)) {
    socket.emit(SocketClientEvents.LeaveRoom)
    socket.disconnect()
  }

  if (roomsActions.joinRoom.match(action)) {
    socket.emit(SocketClientEvents.LeaveRoom)

    const state = store.getState()
    const selectedRoom = selectRooms(state).find(room => room.id === action.payload.id)
    const username = selectUsername(state)
    if (selectedRoom !== undefined) {
      setTimeout(() => {
        socket.emit(SocketClientEvents.JoinRoom, {
          username,
          room: selectedRoom.id,
          roomType: selectedRoom.type
        })
      }, 100)
    }
  }

  if (gameActions.startPlayIng.match(action)) {
    socket.emit(SocketClientEvents.LetsPlay)
  }

  if (gameActions.selectNumber.match(action)) {
    socket.emit(SocketClientEvents.SendNumber, {
      number: selectCurrentNumber(store.getState()),
      selectedNumber: action.payload.number
    })
  }

  next(action)
}

const socketConnectHandler = (store: any, socket: SocketClient, username: string) => {
  socket.emit(SocketClientEvents.Login, { username })

  socket.on(SocketServerEvents.Message, (message: IMessage) => {
    console.log(SocketServerEvents.Message, message)
    if ('socketId' in message && message.socketId) { // login case
      store.dispatch(loginActions.loginEnd({ username: message.user, userid: message.socketId }))
      store.dispatch(messagesActions.addMessage({ message, type: MessageType.Login }))
    } else if ('room' in message && message.room) {
      store.dispatch(messagesActions.addMessage({ message, type: MessageType.JoinRoom }))
    }
  })

  socket.on(SocketServerEvents.Error, (message: IErrorMessage) => {
    console.log(SocketServerEvents.Error, message)
    store.dispatch(messagesActions.addMessage({ message, type: MessageType.Error }))
  })

  socket.on(SocketServerEvents.OnReady, (message: IOnReadyMessage) => {
    console.log(SocketServerEvents.OnReady, message)
    const isCurrentReady = selectIsCurrentReady(store.getState())
    if ((!isCurrentReady && message.state) || (isCurrentReady && !message.state)) {
      store.dispatch(messagesActions.addMessage({ message, type: MessageType.OnReady }))
    }
    store.dispatch(roomsActions.setReady({ isCurrentReady: message.state }))
    if (isCurrentReady && !message.state) {
      store.dispatch(gameActions.resetState())
    }
  })

  socket.on(SocketServerEvents.RandomNumber, (message: IRandomNumberMessage) => {
    console.log(SocketServerEvents.RandomNumber, message)
    if (message.isFirst) {
      store.dispatch(gameActions.setIsPlaying({ isPlaying: true }))
      store.dispatch(gameActions.setWinner({ winner: '' }))
    }
    if (!message.isFirst || selectCurrentRoom(store.getState())?.type === 'cpu') {
      store.dispatch(gameActions.setCanMove({ canMove: true }))
    }
    store.dispatch(gameActions.setCurrentNumber({ currentNumber: +message.number }))
    store.dispatch(messagesActions.addMessage({
      message,
      type: MessageType.RandomNumber
    }))
  })

  socket.on(SocketServerEvents.ActivateYourTurn, (message: IActivateYourTurnMessage) => {
    console.log(SocketServerEvents.ActivateYourTurn, message)
    store.dispatch(gameActions.setCanMove({ canMove: ((message.state === 'play') || (message.user !== selectUserid(store.getState()) && message.state === 'wait')) }))
  })

  socket.on(SocketServerEvents.GameOver, (message: IGameOverMessage) => {
    console.log(SocketServerEvents.GameOver, message)
    const winner = selectWinner(store.getState())
    if (!winner) {
      store.dispatch(gameActions.setWinner({ winner: message.user }))
    }
  })
}

export default socketMiddleware
