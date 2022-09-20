import React from 'react'
import { ReactComponent as Logo } from './logo.svg'
import styles from './Header.module.css'
import { useAppDispatch, useAppSelector } from '../../logic/hooks'
import { loginActions, selectUsername } from '../../pages/login/loginSlice'

const Header: React.FC = () => {
  const username = useAppSelector(selectUsername)
  const dispatch = useAppDispatch()
  const handleLogout = React.useCallback(() => {
    dispatch(loginActions.loginOut())
  }, [dispatch])
  return (
    <header className={styles.header}>
      <Logo className={styles.logo}/>
      <div className={styles.text}>
        <h1 className={styles.title}>Playing with Sabrican</h1>
        <p className={styles.description}>Win the game or win the job</p>
      </div>
      {(username != null) && (<>
        <p className={styles.username}>{username}</p>
        <button className={styles.logout} onClick={handleLogout}>Log Out</button>
      </>)}
    </header>
  )
}

export default Header
