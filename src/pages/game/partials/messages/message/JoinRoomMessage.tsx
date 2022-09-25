import React from 'react'
import { IJoinRoomMessage } from '../../../../../api/socket/SocketTypes'
import { useAppSelector } from '../../../../../logic/hooks'
import { selectRooms } from '../../rooms/roomsSlice'
import SystemMessage from './SystemMessage'

interface Props {
  message: IJoinRoomMessage
}

const JoinRoomMessage: React.FC<Props> = ({ message }: Props) => {
  const rooms = useAppSelector(selectRooms)
  const roomName: string = rooms.find(r => r.id === message.room)?.name ?? ''
  const msg = `${message.user} ${message.message.replace(message.room, roomName)}`
  return (
    <SystemMessage msg={msg}/>
  )
}

export default JoinRoomMessage
