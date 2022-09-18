import React from 'react'
import { ReactComponent as Logo } from './logo.svg'
import styles from './Header.module.css'

const Header: React.FC = () => (
  <header className={styles.header}>
    <Logo className={styles.logo}/>
    <div>
      <h1 className={styles.title}>Playing with Sabrican</h1>
      <p className={styles.description}>Win the game or win the job</p>
    </div>
  </header>
)

export default Header
