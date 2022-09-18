import React from 'react'
import { ReactComponent as Win } from './win.svg'
import { ReactComponent as Lose } from './lose.svg'
import styles from './Final.module.css'

interface Props {
  isWin: boolean
}

const Final: React.FC<Props> = ({ isWin }: Props) => (
  <div className={styles.final}>
    {isWin ? <Win className={styles.imageWin}/> : <Lose className={styles.imageLose}/>}
    <h3 className={styles.title}>You {isWin ? 'won' : 'lose'}</h3>
    <button className={styles.button}>New game</button>
  </div>
)

export default Final
