import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../logic/store'

export interface LoginState {
  username: string | null
}

const initialState: LoginState = {
  username: null
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loginStart: (state, action: PayloadAction<{ // for socketMiddleware.ts
      username: string
    }>) => {},
    loginEnd: (state, action: PayloadAction<{
      username: string
    }>) => {
      state.username = action.payload.username
    },
    loginOut: (state) => {
      state.username = null
    }
  }
})

export const selectUsername = (state: RootState): string | null => state.login.username

export const loginActions = loginSlice.actions
export const loginReducer = loginSlice.reducer
