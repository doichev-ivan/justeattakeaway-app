import React from 'react'
import { IRandomNumberMessage } from '../../../../../api/socket/SocketTypes'
import { ReactComponent as Cpu } from '../cpu.svg'
import { ReactComponent as User } from '../user.svg'
import styles from '../Messages.module.css'
import { useAppSelector } from '../../../../../logic/hooks'
import { selectUsername } from '../../../../login/loginSlice'

interface Props {
  message: IRandomNumberMessage
}

const RandomNumberMessage: React.FC<Props> = ({ message }: Props) => {
  const initialNumber = message.isCorrectResult ? +message.number * 3 - message.selectedNumber : +message.number
  const realResult = Math.round((initialNumber + message.selectedNumber) / 3 * 100) / 100
  const selectedNumber = `${message.selectedNumber > 0 ? '+' : ''}${message.selectedNumber}`
  const username = useAppSelector(selectUsername)
  const isMe = message.user === username
  const isCPU = message.user === 'CPU'
  return message.isFirst
    ? <div className={[styles.result, styles.full].join(' ')}>{message.number}</div>
    : (
      <div className={[styles.move, isMe ? styles.me : styles.opponent].join(' ')}>
        <div className={styles.user}>
          {isCPU ? <Cpu className={styles.avatar}/> : <User className={styles.avatar}/>}
          <div className={styles.message}>{message.user}</div>
        </div>
        <div className={styles.details}>
          <div className={styles.action}>{selectedNumber}</div>
          <div className={styles.result}>[ ( {selectedNumber} + {initialNumber} ) / 3 ] = {realResult}</div>
          <div className={styles.result}>{message.number}</div>
        </div>
      </div>
      )
}

export default RandomNumberMessage
