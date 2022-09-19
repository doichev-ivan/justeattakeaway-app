import React from 'react'
import styles from './App.module.css'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Nav from './components/nav/Nav'
import Content from './components/content/Content'
import { useAppDispatch } from './logic/hooks'
import { appActions } from './logic/slice'

const App: React.FC = () => {
  const dispatch = useAppDispatch()
  React.useEffect(() => {
    dispatch(appActions.startConnecting())
  }, [])
  return (
    <div className={styles.app}>
      <Header/>
      <main className={styles.main}>
        <Nav/>
        <Content/>
      </main>
      <Footer/>
    </div>
  )
}

export default App
