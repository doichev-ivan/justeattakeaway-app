import React from 'react'
import styles from './Rooms.module.css'
import Menu from '../../../../components/menu/Menu'
import { useAppDispatch, useAppSelector } from '../../../../logic/hooks'
import { getRooms, roomsActions, selectCurrentRoomId, selectRooms } from './roomsSlice'

const Rooms: React.FC = () => {
  const dispatch = useAppDispatch()
  const rooms = useAppSelector(selectRooms)
  const currentRoomId = useAppSelector(selectCurrentRoomId)
  React.useEffect(() => {
    dispatch(getRooms())
  }, [dispatch])

  const items = rooms.map(r => ({ id: r.owner, label: r.name })) // room.id was not unique
  const handleSelect = React.useCallback((id: string) => {
    if (id !== currentRoomId) dispatch(roomsActions.joinRoom({ id }))
  }, [currentRoomId])
  return (
    <nav className={styles.rooms}>
      <h4 className={styles.title}>Choose you game room</h4>
      <Menu items={items} selected={currentRoomId} onSelect={handleSelect}/>
    </nav>
  )
}

export default React.memo(Rooms)
