import { useState, useEffect } from 'react'
import logo from './logo.svg'
import './App.css'

function App() {
  const [, setShow] = useState(false)
  const [color, setColor] = useState('green')

  useEffect(() => {
    let i = 0
    let timer = setInterval(() => {
      setColor(['red', 'yellow', 'blue'][i % 3])
      i++
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  }, [])
  return (
    <div
      className="App"
      onClick={() => {
        setShow(show => !show)
      }}
    >
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p color={color}>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
