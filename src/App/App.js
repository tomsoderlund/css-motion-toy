import React, { Component } from 'react'
import { set } from 'lodash'

import './App.css'

import { OUTPUT_OPTIONS_LABELS, SIMULATION_OPTIONS_LABELS } from '../common/constants'
import templates from '../common/templates'
import { defaultSimulationOptions, defaultOutputOptions } from '../common/options'
import { formatOutputCssRow } from '../common/helpers'

import Simulator from '../components/Simulator'
import MultiSelectButton from '../components/MultiSelectButton'
import { ArrayInput, VariableInputBlock } from '../components/ArrayInput'

class App extends Component {
  constructor (props) {
    super(props)
    const currentTemplate = 'bounce'
    this.state = {
      currentTemplate,
      startState: templates[currentTemplate].startState,
      output: [],
      outputOptions: defaultOutputOptions,
      simulationOptions: defaultSimulationOptions
    }
  }

  logOutput ({ comment, position, speed, acceleration, elapsedTime, stylesValues, styles }) {
    const output = [...this.state.output, stylesValues]
    this.setState({ output })
  }

  renderOutput () {
    return this.state.output.reduce((resultCSS, stylesValues) => resultCSS + formatOutputCssRow(stylesValues, this.state.outputOptions, this.state.simulationOptions), '')
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

  handleChangeOutputOptions (variable, index, event) {
    const outputOptions = Object.assign({}, this.state.outputOptions)
    set(outputOptions, `${variable}.${index}`, parseFloat(event.target.value))
    this.setState({ outputOptions })
  }

  // Array, not object
  handleChangeSimulationOptions (index, event) {
    const simulationOptions = this.state.simulationOptions.slice()
    set(simulationOptions, `${index}`, parseFloat(event.target.value))
    this.setState({ simulationOptions })
  }

  render () {
    return (
      <div className='App'>
        <h1>CSS Motion Toy</h1>
        <p>Create CSS animations based on physics simulation</p>

        <h3>Simulation settings</h3>

        <MultiSelectButton
          options={['bounce', 'blackhole', 'cannon']}
          onSelect={this.handleSelectTemplate.bind(this)}
        />

        <p>
          <label>Settings:</label>
          <ArrayInput
            values={this.state.simulationOptions}
            labels={SIMULATION_OPTIONS_LABELS}
            onChange={this.handleChangeSimulationOptions.bind(this)}
          />
        </p>

        <h3>Object start values</h3>

        <VariableInputBlock
          label='Position'
          stateObject={this.state.startState}
          onChange={this.handleChangeStartState.bind(this, 'position')}
        />
        <VariableInputBlock
          label='Speed'
          stateObject={this.state.startState}
          onChange={this.handleChangeStartState.bind(this, 'speed')}
        />
        <VariableInputBlock
          label='Acceleration'
          stateObject={this.state.startState}
          onChange={this.handleChangeStartState.bind(this, 'acceleration')}
        />

        <Simulator
          startState={this.state.startState}
          appliedRules={templates[this.state.currentTemplate].appliedRules}
          options={this.state.simulationOptions}
          handleOutput={this.logOutput.bind(this)}
          handleClearOutput={this.handleClearOutput.bind(this)}
        />

        <h2>Output</h2>
        <VariableInputBlock
          label='Offset'
          stateObject={this.state.outputOptions}
          onChange={this.handleChangeOutputOptions.bind(this, 'offset')}
          labels={OUTPUT_OPTIONS_LABELS}
        />
        <VariableInputBlock
          label='Scale'
          stateObject={this.state.outputOptions}
          onChange={this.handleChangeOutputOptions.bind(this, 'scale')}
          labels={OUTPUT_OPTIONS_LABELS}
        />
        <textarea readOnly value={this.renderOutput()} />

      </div>
    )
  }
}

export default App
