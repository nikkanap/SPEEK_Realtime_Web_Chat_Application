import { useState } from 'react'
import LoginPage from './Login'
import './styles.css'

function HomePage() {
  //const [count, setCount] = useState(0)

  return (
    <>
      <h1>SPEEK Messaging Site</h1>
      <p className="read-the-docs">
        Welcome to SPEEK, a new chatting website.
      </p>
      <a className="link-button" href="">
        Log In
      </a>
      <a className="link-button" href="/signup">
        Sign Up
      </a>
    </>
  )
}

export default HomePage
