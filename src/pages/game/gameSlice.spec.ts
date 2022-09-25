import {
  GameState,
  gameActions,
  gameReducer
} from './gameSlice'

describe('game reducer', () => {
  const initialState: GameState = {
    currentNumber: 0,
    isPlaying: false,
    canMove: false,
    winner: ''
  }

  it('should handle initial state', () => {
    expect(gameReducer(undefined, { type: 'unknown' })).toEqual(initialState)
  })

  it('should handle startPlayIng', () => {
    const actual = gameReducer(initialState, gameActions.startPlayIng())
    expect(actual.winner).toEqual('')
  })

  it('should handle setIsPlaying', () => {
    const actual = gameReducer(initialState, gameActions.setIsPlaying({ isPlaying: true }))
    expect(actual.isPlaying).toEqual(true)
  })

  it('should handle setCanMove', () => {
    const actual = gameReducer(initialState, gameActions.setCanMove({ canMove: true }))
    expect(actual.canMove).toEqual(true)
  })

  it('should handle setCurrentNumber', () => {
    const actual = gameReducer(initialState, gameActions.setCurrentNumber({ currentNumber: 9763 }))
    expect(actual.currentNumber).toEqual(9763)
  })

  it('should handle selectNumber', () => {
    const actual = gameReducer(initialState, gameActions.selectNumber({ number: -1 }))
    expect(actual).toEqual(initialState)
  })

  it('should handle setWinner', () => {
    const actual = gameReducer(initialState, gameActions.setWinner({ winner: 'Test' }))
    expect(actual.winner).toEqual('Test')
  })

  it('should handle resetState', () => {
    const actual = gameReducer(initialState, gameActions.resetState())
    expect(actual).toEqual(initialState)
  })
})
