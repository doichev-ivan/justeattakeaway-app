import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../../../logic/store'
import { Message } from './MessageTypes'
import { loginActions } from '../../../login/loginSlice'
import { roomsActions } from '../rooms/roomsSlice'

export interface MessagesState {
  messages: Message[]
}

const initialState: MessagesState = {
  messages: []
}

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginActions.logout, () => {
        return initialState
      })
      .addCase(roomsActions.joinRoom, () => {
        return initialState
      })
  }
})

export const selectMessages = (state: RootState): Message[] => state.messages.messages

export const messagesActions = messagesSlice.actions
export const messagesReducer = messagesSlice.reducer
