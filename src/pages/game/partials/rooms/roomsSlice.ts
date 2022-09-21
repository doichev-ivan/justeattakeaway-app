import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import restClient from '../../../../api/rest/RestClient'
import restUrls from '../../../../api/rest/restUrls'
import { RootState } from '../../../../logic/store'

export interface Room {
  'id': string
  'name': string
  'owner': string
  'type': 'cpu' | 'human'
}

export interface RoomsState {
  rooms: Room[]
  status: 'idle' | 'loading' | 'failed'
  currentRoomId?: string // we will use owner here, because id is not unique in db
}

const initialState: RoomsState = {
  rooms: [],
  status: 'idle',
  currentRoomId: undefined
}

export const getRooms = createAsyncThunk(
  'rooms/getRooms',
  async () => {
    const rooms = await restClient.get<Room[]>(restUrls.Rooms)
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
        state.rooms = action.payload
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
