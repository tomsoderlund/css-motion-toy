import React, { Component } from 'react'
import './App.css'

import { DIMENSION_LABELS } from '../common/constants'
import Simulator, { getStylesCSS } from '../components/Simulator'
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

const formatOutputCssRow = (stylesValues) => `${stylesValues.elapsedTime / 100}% { ${objectToCSS(getStylesCSS(stylesValues, options))} }\n`

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
      startState: templates[currentTemplate].startState,
      output: []
    }
  }

  logOutput ({ comment, position, speed, acceleration, elapsedTime, stylesValues, styles }) {
    const output = [...this.state.output, stylesValues]
    this.setState({ output })
  }

  renderOutput () {
    return this.state.output.reduce((resultCSS, stylesValues) => resultCSS + formatOutputCssRow(stylesValues), '')
  }

  handleClearOutput () {
    this.setState({ output: [] })
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
          handleOutput={this.logOutput.bind(this)}
          handleClearOutput={this.handleClearOutput.bind(this)}
        />

        <h2>Output</h2>
        <textarea readOnly value={this.renderOutput()} />

      </div>
    )
  }
}

export default App
