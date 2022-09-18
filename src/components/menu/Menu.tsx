import React from 'react'
import { ReactComponent as Arrow } from './arrow.svg'
import styles from './Menu.module.css'

const Menu: React.FC = () => (
  <ul className={styles.menu}>
    <li className={styles.menuItem}>Berlin CPU <Arrow className={styles.arrow}/></li>
    <li className={styles.menuItem}>Amsterdam CPU <Arrow className={styles.arrow}/></li>
    <li className={[styles.menuItem, styles.active].join(' ')}>Sabrican <Arrow className={styles.arrow}/></li>
  </ul>
)

export default Menu
