import React from 'react'
import styles from './Actions.module.css'

const Actions: React.FC = () => (
  <div className={styles.actions}>
    <div className={styles.action}>-1</div>
    <div className={styles.action}>0</div>
    <div className={[styles.action, styles.final].join(' ')}>+1</div>
  </div>
)

export default Actions
