import React from 'react'
import styles from './Input.module.css'

interface Props {
  type?: string
  value?: string
  onChange?: (value: string) => void
}

const Input: React.FC<Props> = ({
  type = 'text',
  value = '',
  onChange
}: Props) => (
  <input
    type={type}
    value={value}
    onChange={(e) => onChange?.(e.target.value)}
    className={styles.input}
  />
)

export default Input
