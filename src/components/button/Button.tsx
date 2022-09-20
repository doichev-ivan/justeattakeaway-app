import React from 'react'
import styles from './Button.module.css'

interface Props {
  label: string
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
}

const Button: React.FC<Props> = ({ label, type = 'button', onClick }: Props) => (
  <button className={styles.button} type={type} onClick={onClick}>{label}</button>
)

export default Button
