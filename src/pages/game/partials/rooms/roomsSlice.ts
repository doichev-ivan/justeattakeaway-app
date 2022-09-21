import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import restClient from '../../../../api/rest/RestClient'
import restUrls from '../../../../api/rest/restUrls'
import { RootState } from '../../../../logic/store'
import { RoomServer } from '../../../../api/rest/RestTypes'

export interface Room {
  'id': string // we will use owner as id, because initial id is not unique in db
  'name': string
  'type': 'cpu' | 'human'
}

export interface RoomsState {
  rooms: Room[]
  status: 'idle' | 'loading' | 'failed'
  currentRoomId?: string
}

const initialState: RoomsState = {
  rooms: [],
  status: 'idle',
  currentRoomId: undefined
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
  }
})

export const selectRooms = (state: RootState): Room[] => state.rooms.rooms
export const selectCurrentRoomId = (state: RootState): string | undefined => state.rooms.currentRoomId

export const roomsActions = roomsSlice.actions
export const roomsReducer = roomsSlice.reducer
