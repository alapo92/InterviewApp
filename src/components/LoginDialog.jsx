import React, { useState } from 'react'
import styled from 'styled-components'

const DialogOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`

const DialogContent = styled.div`
  background: #232323;
  padding: 1em;
  border-radius: 8px;
  width: 300px;
  box-sizing: border-box;
`

const TextField = styled.input`
  width: 100%;
  margin-bottom: 1rem;
`

const Button = styled.button`
  margin-right: 1rem;
`

const LoginDialog = () => {
  const [open, setOpen] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

    const toggleOpen = () => {
        setOpen(!open)
    }

  const handleLogin = () => {
    // Handle login logic here
    console.log(`Username: ${username}, Password: ${password}`)
    toggleOpen()
  }

  if (!open) return <Button onClick={toggleOpen}>Login</Button>

  return (
    <DialogOverlay>
      <DialogContent>
        <h2>Login</h2>
        <TextField
          autoFocus
          type='text'
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={toggleOpen}>Cancel</Button>
        <Button onClick={handleLogin}>Login</Button>
      </DialogContent>
    </DialogOverlay>
  )
}

export default LoginDialog
