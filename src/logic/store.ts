import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import { gameReducer } from '../pages/game/gameSlice'
import { loginReducer } from '../pages/login/loginSlice'
import { roomsReducer } from '../pages/game/partials/rooms/roomsSlice'
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

const persistConfig = {
  key: 'justeattakeaway-app',
  version: 1,
  storage
}

const rootReducer = combineReducers({
  counter: counterReducer,
  login: loginReducer,
  game: gameReducer,
  rooms: roomsReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
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
