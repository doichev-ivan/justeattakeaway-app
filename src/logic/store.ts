import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import { appReducer } from './slice'
import SocketClient from '../api/socket/SocketClient'
import middleware from './middleware'

export const socket = new SocketClient()

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    app: appReducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat([middleware(socket)])
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>
>
