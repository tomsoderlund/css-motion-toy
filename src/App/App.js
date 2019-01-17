import React, { Component } from 'react'
import './App.css'

import Simulator from '../components/Simulator'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <h1>CSS Motion Toy</h1>
        <Simulator />
      </div>
    )
  }
}

export default App
