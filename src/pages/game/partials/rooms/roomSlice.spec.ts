import {
  RoomsState,
  roomsActions,
  roomsReducer
} from './roomsSlice'

describe('room reducer', () => {
  const initialState: RoomsState = {
    rooms: [],
    status: 'idle',
    currentRoomId: undefined,
    isCurrentReady: false
  }

  it('should handle initial state', () => {
    expect(roomsReducer(undefined, { type: 'unknown' })).toEqual(initialState)
  })

  it('should handle joinRoom', () => {
    const actual = roomsReducer(initialState, roomsActions.joinRoom({ id: 'roomId' }))
    expect(actual.currentRoomId).toEqual('roomId')
    expect(actual.isCurrentReady).toEqual(false)
  })

  it('should handle setReady', () => {
    const actual = roomsReducer(initialState, roomsActions.setReady({ isCurrentReady: true }))
    expect(actual.isCurrentReady).toEqual(true)
  })
})
