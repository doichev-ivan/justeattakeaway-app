import React from 'react'
import styles from './Nav.module.css'
import Menu from '../menu/Menu'

const Nav: React.FC = () => (
  <nav className={styles.nav}>
    <h4 className={styles.title}>Choose you game room</h4>
    <Menu/>
  </nav>
)

export default Nav
