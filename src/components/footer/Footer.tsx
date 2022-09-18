import React from 'react'
import { ReactComponent as Logo } from './logo.svg'
import styles from './Footer.module.css'

const Footer: React.FC = () => (
  <footer className={styles.footer}>
    <Logo className={styles.logo}/>
    <div>
      <span>Cookie statement</span>
      <span className={styles.copy}>&copy; 2021 Takeaway.com</span>
    </div>
  </footer>
)

export default Footer
