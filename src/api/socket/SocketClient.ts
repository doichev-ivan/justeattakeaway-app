import io, { Socket } from 'socket.io-client'
import { SocketDefaultEvents } from './SocketEvents'

export default class SocketClient {
  private socket: typeof Socket | null = null

  connect (): void {
    this.socket = io(process.env.REACT_APP_API_URL as string)
  }

  disconnect (): void {
    if (this.socket != null) {
      this.socket.disconnect()
      this.socket = null
    }
  }

  emit (eventName: string, data: any): void {
    if (this.socket != null) {
      this.socket.emit(eventName, data)
    }
  }

  on (eventName: string, func: (data: any) => void): void {
    if (this.socket != null) {
      this.socket.on(eventName, func)
    }
  }

  init (connectCallback?: () => void): void {
    this.connect()
    this.on(SocketDefaultEvents.Connect, () => {
      console.log('connected')
      connectCallback?.()
    })
    this.on(SocketDefaultEvents.ConnectError, () => {
      setTimeout(() => {
        this.socket?.connect()
      }, 1000)
    })
    this.on(SocketDefaultEvents.Disconnect, (reason) => {
      if (reason === 'io server disconnect') {
        // the disconnection was initiated by the server, you need to reconnect manually
        this.socket?.connect()
      }
      // else the socket will automatically try to reconnect
    })
  }

  get isConnected (): boolean {
    return this.socket?.connected === true
  }
}
