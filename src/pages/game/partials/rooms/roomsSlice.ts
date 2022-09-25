import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import restClient from '../../../../api/rest/RestClient'
import restUrls from '../../../../api/rest/restUrls'
import { RootState } from '../../../../logic/store'
import { RoomServer } from '../../../../api/rest/RestTypes'
import { loginActions } from '../../../login/loginSlice'

export interface Room {
  'id': string // we will use owner as id, because initial id is not unique in db
  'name': string
  'type': 'cpu' | 'human'
}

export interface RoomsState {
  rooms: Room[]
  status: 'idle' | 'loading' | 'failed'
  currentRoomId?: string
  isCurrentReady: boolean
}

const initialState: RoomsState = {
  rooms: [],
  status: 'idle',
  currentRoomId: undefined,
  isCurrentReady: false
}

export const getRooms = createAsyncThunk(
  'rooms/getRooms',
  async () => {
    const rooms = await restClient.get<RoomServer[]>(restUrls.Rooms)
    // The value we return becomes the `fulfilled` action payload
    return rooms
  }
)

export const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    joinRoom: (state, action: PayloadAction<{ // for socketMiddleware.ts
      id: string
    }>) => {
      state.currentRoomId = action.payload.id
      state.isCurrentReady = false
    },
    setReady: (state, action: PayloadAction<{
      isCurrentReady: boolean
    }>) => {
      state.isCurrentReady = action.payload.isCurrentReady
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRooms.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getRooms.fulfilled, (state, action) => {
        state.status = 'idle'
        state.rooms = action.payload.map(sr => ({ ...sr, id: sr.owner }))
      })
      .addCase(getRooms.rejected, (state) => {
        state.status = 'failed'
      })
      .addCase(loginActions.logout, (state) => {
        state.currentRoomId = undefined
        state.isCurrentReady = false
      })
  }
})

export const selectRooms = (state: RootState): Room[] => state.rooms.rooms
export const selectCurrentRoomId = (state: RootState): string | undefined => state.rooms.currentRoomId
export const selectCurrentRoom = (state: RootState): Room | undefined => selectRooms(state).find(room => room.id === selectCurrentRoomId(state))
export const selectIsCurrentReady = (state: RootState): boolean => state.rooms.isCurrentReady

export const roomsActions = roomsSlice.actions
export const roomsReducer = roomsSlice.reducer
