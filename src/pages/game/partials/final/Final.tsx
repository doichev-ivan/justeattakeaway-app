import React from 'react'
import { ReactComponent as Win } from './win.svg'
import { ReactComponent as Lose } from './lose.svg'
import styles from './Final.module.css'
import Button from '../../../../components/button/Button'
import { useAppDispatch, useAppSelector } from '../../../../logic/hooks'
import { gameActions, selectWinner } from '../../gameSlice'
import { selectUsername } from '../../../login/loginSlice'

const Final: React.FC = () => {
  const dispatch = useAppDispatch()
  const handleNewGame = React.useCallback(() => {
    dispatch(gameActions.startPlayIng())
  }, [])
  const winner = useAppSelector(selectWinner)
  const username = useAppSelector(selectUsername)
  const isWin = winner === username
  if (!winner) return null
  return (
    <div className={styles.final}>
      {isWin ? <Win className={styles.imageWin}/> : <Lose className={styles.imageLose}/>}
      <h3 className={styles.title}>You {isWin ? 'won' : 'lose'}</h3>
      <Button label='New game' onClick={handleNewGame}/>
    </div>
  )
}

export default Final
