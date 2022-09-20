import React from 'react'
import styles from './App.module.css'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Login from './pages/login/Login'
import Game from './pages/game/Game'
import { useAppSelector } from './logic/hooks'
import { selectUsername } from './pages/login/loginSlice'

const App: React.FC = () => {
  const username = useAppSelector(selectUsername)
  return (
    <div className={styles.app}>
      <Header/>
      <main className={styles.main}>
        {username === null ? <Login/> : <Game/> }
      </main>
      <Footer/>
    </div>
  )
}

export default App
