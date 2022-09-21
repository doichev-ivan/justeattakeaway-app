import React from 'react'
import { ReactComponent as Arrow } from './arrow.svg'
import styles from './Menu.module.css'

interface MenuItem {
  id: string
  label: string
}

interface Props {
  items: MenuItem[]
  selected?: MenuItem['id']
  onSelect?: (id: MenuItem['id']) => void
}

const Menu: React.FC<Props> = ({ items, selected, onSelect }: Props) => (
  <ul className={styles.menu}>
    {items.map(item => (
      <li
        key={item.id}
        className={[styles.menuItem, item.id === selected ? styles.active : ''].join(' ')}
        onClick={() => onSelect?.(item.id)}
      >
        {item.label}
        <Arrow className={styles.arrow}/>
      </li>
    ))}
  </ul>
)

export default React.memo(Menu)
