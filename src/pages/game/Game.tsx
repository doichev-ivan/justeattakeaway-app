import React from 'react'
import Rooms from './partials/rooms/Rooms'
import Messages from './partials/messages/Messages'
import Actions from './partials/actions/Actions'
import Final from './partials/final/Final'
import styles from './Game.module.css'

const Game: React.FC = () => {
  return (
    <>
      <Rooms/>
      <section className={styles.content}>
        <Messages/>
        <Actions/>
      </section>
      <Final />
    </>
  )
}

export default Game
