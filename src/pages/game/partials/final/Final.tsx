import React from 'react'
import { ReactComponent as Win } from './win.svg'
import { ReactComponent as Lose } from './lose.svg'
import styles from './Final.module.css'
import Button from '../../../../components/button/Button'

interface Props {
  isWin: boolean
}

const Final: React.FC<Props> = ({ isWin }: Props) => (
  <div className={styles.final}>
    {isWin ? <Win className={styles.imageWin}/> : <Lose className={styles.imageLose}/>}
    <h3 className={styles.title}>You {isWin ? 'won' : 'lose'}</h3>
    <Button label='New game'/>
  </div>
)

export default Final
