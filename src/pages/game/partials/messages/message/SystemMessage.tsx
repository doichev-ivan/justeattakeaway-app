import React from 'react'
import styles from '../Messages.module.css'

interface Props {
  msg: string
  error?: boolean
}

const SystemMessage: React.FC<Props> = ({ msg, error = false }: Props) => {
  return (
    <div className={[styles.message, error ? styles.error : ''].join(' ')}>{msg}</div>
  )
}

export default SystemMessage
