import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import { gameReducer } from '../pages/game/gameSlice'
import { loginReducer } from '../pages/login/loginSlice'
import { roomsReducer } from '../pages/game/partials/rooms/roomsSlice'
import { messagesReducer } from '../pages/game/partials/messages/messagesSlice'
import socketClient from '../api/socket/SocketClient'
import socketMiddleware from './socketMiddleware'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const loginPersistConfig = {
  key: 'justeattakeaway-app/login',
  version: 1,
  storage,
  whitelist: ['username']
}

const roomsPersistConfig = {
  key: 'justeattakeaway-app/rooms',
  version: 1,
  storage,
  whitelist: ['rooms']
}

const rootReducer = combineReducers({
  counter: counterReducer,
  login: persistReducer(loginPersistConfig, loginReducer),
  rooms: persistReducer(roomsPersistConfig, roomsReducer),
  messages: messagesReducer,
  game: gameReducer
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat([socketMiddleware(socketClient)])
  }
})

export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>
>
