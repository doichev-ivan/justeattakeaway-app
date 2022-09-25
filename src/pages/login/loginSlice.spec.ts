import {
  LoginState,
  loginActions,
  loginReducer
} from './loginSlice'

describe('login reducer', () => {
  const initialState: LoginState = {
    username: null,
    userid: null
  }

  it('should handle initial state', () => {
    expect(loginReducer(undefined, { type: 'unknown' })).toEqual(initialState)
  })

  it('should handle loginStart', () => {
    const actual = loginReducer(initialState, loginActions.loginStart({ username: 'name' }))
    expect(actual.username).toEqual(null)
  })

  it('should handle loginEnd', () => {
    const actual = loginReducer(initialState, loginActions.loginEnd({ username: 'name', userid: 'id' }))
    expect(actual.username).toEqual('name')
  })

  it('should handle logout', () => {
    const actual = loginReducer(initialState, loginActions.logout())
    expect(actual.username).toEqual(null)
  })
})
