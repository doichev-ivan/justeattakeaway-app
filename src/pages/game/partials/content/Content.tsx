import React from 'react'
import { ReactComponent as Cpu } from './cpu.svg'
import { ReactComponent as User } from './user.svg'
import styles from './Content.module.css'
import Actions from '../actions/Actions'
import Final from '../final/Final'

const Content: React.FC = () => (
  <section className={styles.content}>
    <div className={[styles.move, styles.opponent].join(' ')}>
      <Cpu className={styles.avatar}/>
      <div className={styles.details}>
        <div className={styles.action}>-1</div>
        <div className={styles.result}>[ ( -1 + 19 )  / 3 ] = 6</div>
        <div className={styles.result}>6</div>
      </div>
    </div>
    <div className={[styles.move, styles.user].join(' ')}>
      <User className={styles.avatar}/>
      <div className={styles.details}>
        <div className={styles.action}>0</div>
        <div className={styles.result}>[ ( 0 + 6 )  / 3 ] = 2</div>
        <div className={styles.result}>2</div>
      </div>
    </div>
    <div className={[styles.move, styles.opponent].join(' ')}>
      <Cpu className={styles.avatar}/>
      <div className={styles.details}>
        <div className={styles.action}>+1</div>
        <div className={styles.result}>[ ( +1 + 2 )  / 3 ] = 1</div>
        <div className={styles.result}>1</div>
      </div>
    </div>
    <Actions/>
    <Final isWin={true}/>
  </section>
)

export default Content
