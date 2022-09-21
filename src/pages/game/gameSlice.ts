import { createSlice } from '@reduxjs/toolkit'

export interface GameState {
  rooms: string[]
}

const initialState: GameState = {
  rooms: []
}

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {}
})

export const gameActions = gameSlice.actions
export const gameReducer = gameSlice.reducer
