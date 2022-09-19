import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface AppMessage {
  user: string
  message: string
  socketId: string
  room: string
}

export interface AppState {
  messages: AppMessage[]
  isEstablishingConnection: boolean
  isConnected: boolean
}

const initialState: AppState = {
  messages: [],
  isEstablishingConnection: false,
  isConnected: false
}

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    startConnecting: state => {
      state.isEstablishingConnection = true
    },
    connectionEstablished: state => {
      state.isConnected = true
      state.isEstablishingConnection = true
    },
    receiveMessage: (state, action: PayloadAction<{
      message: AppMessage
    }>) => {
      state.messages.push(action.payload.message)
    },
    submitMessage: (state, action: PayloadAction<{
      content: string
    }>) => {

    }
  }
})

export const appActions = slice.actions
export const appReducer = slice.reducer

export default slice
