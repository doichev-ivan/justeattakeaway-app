import io, { Socket } from 'socket.io-client'

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
}
