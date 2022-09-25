import { messagesActions, messagesReducer, MessagesState } from './messagesSlice'
import { MessageType } from './MessageTypes'
import { ILoginMessage } from '../../../../api/socket/SocketTypes'

describe('messages reducer', () => {
  const initialState: MessagesState = {
    messages: []
  }

  it('should handle initial state', () => {
    expect(messagesReducer(undefined, { type: 'unknown' })).toEqual(initialState)
  })

  it('should handle addMessage', () => {
    const message: ILoginMessage = {
      user: 'Test',
      message: 'Welcome',
      socketId: 'id'
    }
    const actual = messagesReducer(initialState, messagesActions.addMessage({
      type: MessageType.RandomNumber,
      message
    }))
    expect((actual.messages[0].message as ILoginMessage).user).toEqual('Test')
    expect((actual.messages[0].message as ILoginMessage).socketId).toEqual('id')
  })
})
