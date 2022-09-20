import React, { FormEvent } from 'react'
import styles from './Login.module.css'
import Input from '../../components/input/Input'
import Button from '../../components/button/Button'
import { useAppDispatch } from '../../logic/hooks'
import { loginActions } from './loginSlice'

const Login: React.FC = () => {
  const dispatch = useAppDispatch()
  const [name, setName] = React.useState('')
  const handleStart = (event: FormEvent) => {
    event.preventDefault()
    if (name.trim() !== '') {
      dispatch(loginActions.loginStart({ username: name }))
    }
  }
  return (
    <form className={styles.login} onSubmit={handleStart}>
      <h4 className={styles.title}>Enter your name to start</h4>
      <Input value={name} onChange={setName}/>
      <Button label="Start playing" type="submit"/>
    </form>
  )
}

export default Login
