import React, { Component, Fragment } from 'react'

import styled from 'styled-components'

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

const TIMER_INTERVAL = 50
const FRICTION = 0.1
const SKEW = true
const X = 0; const Y = 1; const Z = 2; const ROTATION = 3; const OPACITY = 4

const physicsInitialState = {
  // X, Y, Z, rotation, opacity
  position: [150, 10, 0, 0, 1],
  speed: [20, 20, 0, 0, 0],
  acceleration: [0, 0, 0, 0, 0]
}

const roundTo3decimals = value => Math.round(value * 1000) / 1000

const getStyleProps = state => ({
  left: `${roundTo3decimals(state.position[X])}px`,
  top: `${roundTo3decimals(state.position[Y])}px`,
  transform: `scale(${roundTo3decimals(1 - (state.position[Z] || 0.001) / 500)})` +
    ` rotate(${roundTo3decimals(state.position[ROTATION])}deg)` +
    (SKEW ? ` skew(${roundTo3decimals(state.speed[X])}deg, ${roundTo3decimals(state.speed[Y])}deg)` : ''),
  opacity: roundTo3decimals(state.position[OPACITY])
})

const objectToCSS = obj => Object.keys(obj).reduce((result, key) => result + `${key}: ${obj[key]}; `, '')

const applyRuleBounce = ({ dimension = Z, wallPosition = 250, position, speed, acceleration }) => {
  if (position[dimension] > wallPosition) {
    position[dimension] = wallPosition
    speed[dimension] = -speed[dimension] * (1 - FRICTION)
    speed[ROTATION] = -speed[ROTATION] * (1 - FRICTION)
    position[ROTATION] = position[ROTATION] * (1 - FRICTION) // slow down to zero
  }
}

const applyRuleBlackHole = ({ gravity = 0.01, holePosition = [150, 150], position, speed, acceleration }) => {
  for (let dimension = X; dimension <= Z; dimension++) {
    acceleration[dimension] = (holePosition[dimension] - position[dimension]) * gravity
    speed[dimension] *= (1 - FRICTION / 10)
  }
}

export default class Simulator extends Component {
  constructor (props) {
    super(props)
    this.state = Object.assign({}, physicsInitialState, {
      isRunning: false,
      timeStarted: Date.now(),
      elapsedTime: 0
    })
  }

  componentDidMount () {
    this.timer = setInterval(this.onTimerUpdate.bind(this), TIMER_INTERVAL)
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
      // applyRuleBounce({ elapsedTime, position, speed, acceleration })
      applyRuleBlackHole({ elapsedTime, position, speed, acceleration })

      // Update all dimensions
      for (let dim = 0; dim < position.length; dim++) {
        speed[dim] += acceleration[dim]
        position[dim] += speed[dim]
      }
      this.setState({ position, speed, acceleration, elapsedTime })
      console.log(`${elapsedTime / 100}% { ${objectToCSS(getStyleProps({ position, speed, acceleration }))}}`)
    }
  }

  toggleRunning () {
    const isRunning = !this.state.isRunning
    this.setState({ isRunning })
    if (isRunning) {
      const timeStarted = Date.now()
      const { position, speed, acceleration } = Object.assign({}, physicsInitialState)
      this.setState({ position, speed, acceleration, timeStarted })
    }
  }

  render () {
    return <Fragment>
      <SimulatorContainer>
        <TheBox style={getStyleProps(this.state)} />
      </SimulatorContainer>
      <p>
        <button onClick={this.toggleRunning.bind(this)}>{!this.state.isRunning ? 'Start' : 'Stop'}</button>
      </p>
    </Fragment>
  }
}
