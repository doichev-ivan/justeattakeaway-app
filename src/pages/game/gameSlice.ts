import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../logic/store'
import { loginActions } from '../login/loginSlice'
import { roomsActions } from './partials/rooms/roomsSlice'

export interface GameState {
  currentNumber: number
  isPlaying: boolean
  canMove: boolean
  winner: string
}

const initialState: GameState = {
  currentNumber: 0,
  isPlaying: false,
  canMove: false,
  winner: ''
}

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startPlayIng: (state) => {
      state.winner = ''
    },
    setIsPlaying: (state, action: PayloadAction<{
      isPlaying: boolean
    }>) => {
      state.isPlaying = action.payload.isPlaying
    },
    setCanMove: (state, action: PayloadAction<{
      canMove: boolean
    }>) => {
      state.canMove = action.payload.canMove
    },
    setCurrentNumber: (state, action: PayloadAction<{
      currentNumber: number
    }>) => {
      state.currentNumber = action.payload.currentNumber
    },
    selectNumber: (state, action: PayloadAction<{
      number: number
    }>) => {},
    setWinner: (state, action: PayloadAction<{
      winner: string
    }>) => {
      state.winner = action.payload.winner
    },
    resetState: () => {
      return initialState
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

export const selectIsPlaying = (state: RootState): boolean => state.game.isPlaying
export const selectCanMove = (state: RootState): boolean => state.game.canMove
export const selectCurrentNumber = (state: RootState): number => state.game.currentNumber
export const selectWinner = (state: RootState): string => state.game.winner

export const gameActions = gameSlice.actions
export const gameReducer = gameSlice.reducer
