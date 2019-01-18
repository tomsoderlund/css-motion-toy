import React, { Component } from 'react'
import './App.css'

import Simulator from '../components/Simulator'

const activeTemplateIndex = 0

const templates = [
  {
    name: 'bounce',
    startState: {
      // X, Y, Z, rotation, opacity
      position: [150, 10, 0, 0, 1],
      speed: [0, 0, 0, 0, 0],
      acceleration: [0, 2, 0, 0, 0]
    },
    appliedRules: [
      { name: 'bounce' }
    ]
  },

  {
    name: 'blackhole',
    startState: {
      // X, Y, Z, rotation, opacity
      position: [150, 10, 0, 0, 1],
      speed: [20, 20, 0, 0, 0],
      acceleration: [0, 0, 0, 0, 0]
    },
    appliedRules: [
      { name: 'blackhole' }
    ]
  }
]

const options = {
  skew: true,
  stretch: false,
  friction: 0.1,
  timerInterval: 50
}

const objectToCSS = obj => Object.keys(obj).reduce((result, key) => result + `${key}: ${obj[key]}; `, '')

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      propName: 'this prop'
    }
  }

  logOutput ({ comment, position, speed, acceleration, elapsedTime, styles }) {
    console.log(`${elapsedTime / 100}% { ${objectToCSS(styles)}}`)
  }

  render () {
    return (
      <div className='App'>
        <h1>CSS Motion Toy</h1>
        <p>Create CSS animations based on physics simulation</p>
        <Simulator
          startState={templates[activeTemplateIndex].startState}
          appliedRules={templates[activeTemplateIndex].appliedRules}
          options={options}
          handleOutput={this.logOutput}
        />
      </div>
    )
  }
}

export default App
