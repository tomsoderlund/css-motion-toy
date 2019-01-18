import React, { Component } from 'react'
import './App.css'

import { DIMENSION_LABELS } from '../common/constants'
import Simulator from '../components/Simulator'
import MultiSelectButton from '../components/MultiSelectButton'
import ArrayInput from '../components/ArrayInput'

const { set } = require('lodash')

const templates = {
  bounce: {
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

  blackhole: {
    startState: {
      // X, Y, Z, rotation, opacity
      position: [150, 10, 0, 0, 1],
      speed: [20, 20, 0, 0, 0],
      acceleration: [0, 0, 0, 0, 0]
    },
    appliedRules: [
      { name: 'blackhole' }
    ]
  },

  cannon: {
    startState: {
      // X, Y, Z, rotation, opacity
      position: [150, 10, 0, 0, 1],
      speed: [0, 1, 0, 0, 0],
      acceleration: [0, 0, 0, 0, 0]
    },
    appliedRules: [
      { name: 'cannon' }
    ]
  }
}

const options = {
  skew: true,
  stretch: false,
  friction: 0.1,
  timerInterval: 50
}

const objectToCSS = obj => Object.keys(obj).reduce((result, key) => result + `${key}: ${obj[key]}; `, '')

const VariableInputBlock = ({ startState, label, onChange }) => <p>
  <label>{label}:</label>
  <ArrayInput
    values={startState[label.toLowerCase()]}
    labels={DIMENSION_LABELS}
    onChange={onChange}
  />
</p>

class App extends Component {
  constructor (props) {
    super(props)
    const currentTemplate = 'bounce'
    this.state = {
      currentTemplate,
      startState: templates[currentTemplate].startState
    }
  }

  logOutput ({ comment, position, speed, acceleration, elapsedTime, styles }) {
    console.log(`${elapsedTime / 100}% { ${objectToCSS(styles)}}`)
  }

  handleSelectTemplate (currentTemplate) {
    this.setState({ currentTemplate, startState: templates[currentTemplate].startState })
  }

  handleChangeStartState (variable, index, event) {
    const startState = Object.assign({}, this.state.startState)
    set(startState, `${variable}.${index}`, parseFloat(event.target.value))
    this.setState({ startState })
  }

  render () {
    return (
      <div className='App'>
        <h1>CSS Motion Toy</h1>
        <p>Create CSS animations based on physics simulation</p>
        <p>
          <MultiSelectButton
            options={['bounce', 'blackhole', 'cannon']}
            onSelect={this.handleSelectTemplate.bind(this)}
          />
        </p>
        <VariableInputBlock
          label='Position'
          startState={this.state.startState}
          onChange={this.handleChangeStartState.bind(this, 'position')}
        />
        <VariableInputBlock
          label='Speed'
          startState={this.state.startState}
          onChange={this.handleChangeStartState.bind(this, 'speed')}
        />
        <VariableInputBlock
          label='Acceleration'
          startState={this.state.startState}
          onChange={this.handleChangeStartState.bind(this, 'acceleration')}
        />
        <Simulator
          startState={this.state.startState}
          appliedRules={templates[this.state.currentTemplate].appliedRules}
          options={options}
          handleOutput={this.logOutput}
        />
      </div>
    )
  }
}

export default App
