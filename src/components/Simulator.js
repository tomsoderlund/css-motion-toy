import React, { Component, Fragment } from 'react'

import styled from 'styled-components'

import { X, Y, Z, ROTATION, OPACITY } from '../common/constants'
import rules from '../common/rules'

const SimulatorContainer = styled.div`
  position: relative;
  display: inline-block;
  overflow: hidden;
  font-size: 1vmin;
  width:  60em;
  height: 60em;
  background-color: #eee;
  border: 1px solid gray;
`

const TheBox = styled.div`
  position: absolute;
  width: 15em;
  height: 7.5em;
  background-color: slateblue;
  border-radius: 1em;
`

const roundTo3decimals = value => Math.round(value * 1000) / 1000

const getStyleProps = (state, options = {}) => ({
  left: `${roundTo3decimals(state.position[X])}px`,
  top: `${roundTo3decimals(state.position[Y])}px`,
  transform: `scale(${roundTo3decimals(1 - (state.position[Z] || 0.001) / 500)})` +
    ` rotate(${roundTo3decimals(state.position[ROTATION])}deg)` +
    (options.skew ? ` skew(${roundTo3decimals(state.speed[X])}deg, ${roundTo3decimals(state.speed[Y])}deg)` : '') +
    (options.stretch ? ` scale(${roundTo3decimals(1 + state.speed[X] / 40)}, ${roundTo3decimals(1 + state.speed[Y] / 40)})` : ''),
  opacity: roundTo3decimals(state.position[OPACITY])
})

export default class Simulator extends Component {
  constructor (props) {
    super(props)
    this.state = Object.assign({}, this.props.startState, {
      isRunning: false,
      timeStarted: Date.now(),
      elapsedTime: 0
    })
  }

  componentDidMount () {
    this.timer = setInterval(this.onTimerUpdate.bind(this), this.props.options.timerInterval)
  }

  componentWillUnmount () {
    clearInterval(this.timer)
  }

  onTimerUpdate () {
    if (this.state.isRunning) {
      const elapsedTime = Date.now() - this.state.timeStarted
      const position = this.state.position.slice()
      const speed = this.state.speed.slice()
      const acceleration = this.state.acceleration.slice()

      // Rules
      for (let r in this.props.appliedRules) {
        rules[this.props.appliedRules[r].name].apply({ elapsedTime, position, speed, acceleration, options: this.props.options })
      }

      // Update all dimensions
      for (let dim = 0; dim < position.length; dim++) {
        speed[dim] += acceleration[dim]
        position[dim] += speed[dim]
      }
      this.setState({ position, speed, acceleration, elapsedTime })
      this.props.handleOutput({ position, speed, acceleration, elapsedTime, styles: getStyleProps({ position, speed, acceleration }, this.props.options) })
    }
  }

  toggleRunning () {
    const isRunning = !this.state.isRunning
    this.setState({ isRunning })
    if (isRunning) {
      const timeStarted = Date.now()
      const { position, speed, acceleration } = Object.assign({}, this.props.startState)
      this.setState({ position, speed, acceleration, timeStarted })
    }
  }

  render () {
    return <Fragment>
      <SimulatorContainer>
        <TheBox style={getStyleProps(this.state, this.props.options)} />
      </SimulatorContainer>
      <p>
        <button onClick={this.toggleRunning.bind(this)}>{!this.state.isRunning ? 'Start' : 'Stop'}</button>
      </p>
    </Fragment>
  }
}
