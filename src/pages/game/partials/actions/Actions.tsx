import React from 'react'
import styles from './Actions.module.css'
import Button from '../../../../components/button/Button'
import { useAppDispatch, useAppSelector } from '../../../../logic/hooks'
import { gameActions, selectIsPlaying, selectCanMove } from '../../gameSlice'
import { selectIsCurrentReady } from '../rooms/roomsSlice'

const Actions: React.FC = () => {
  const dispatch = useAppDispatch()
  const isCurrentReady = useAppSelector(selectIsCurrentReady)
  const isPlaying = useAppSelector(selectIsPlaying)
  const canMove = useAppSelector(selectCanMove)
  const handlePlay = React.useCallback(() => {
    dispatch(gameActions.startPlayIng())
  }, [])
  const handleNumber = React.useCallback((number: number) => {
    dispatch(gameActions.selectNumber({ number }))
  }, [])
  const containerRef = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [canMove])
  if (!isCurrentReady) return null
  return (
    <div ref={containerRef} className={styles.actions}>
      {!isPlaying && <Button label={'Lets Play'} onClick={handlePlay}/>}
      {isPlaying && canMove && <>
        <div className={styles.action} onClick={() => handleNumber(-1)}>-1</div>
        <div className={styles.action} onClick={() => handleNumber(0)}>0</div>
        <div className={styles.action} onClick={() => handleNumber(1)}>+1</div>
      </>}
      {isPlaying && !canMove && <div>Waiting...</div>}
    </div>
  )
}

export default Actions
