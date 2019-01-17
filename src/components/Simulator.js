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
  width: 20em;
  height: 10em;
  background-color: slateblue;
  border-radius: 1em;
`

const TIMER_INTERVAL = 50

const X = 0; const Y = 1; const ROTATION = 3; const OPACITY = 4

const physicsInitialState = {
  // X, Y, Z, rotation, opacity
  position: [100, 0, 0, 0, 1],
  speed: [0, 0, 0, 10, 0],
  acceleration: [0, 2, 0, 0, 0]
}

const roundTo3decimals = value => Math.round(value * 1000) / 1000

const getStyleProps = state => ({
  left: `${roundTo3decimals(state.position[X])}px`,
  top: `${roundTo3decimals(state.position[Y])}px`,
  transform: `rotate(${roundTo3decimals(state.position[ROTATION])}deg)`,
  opacity: roundTo3decimals(state.position[OPACITY])
})

const objectToCSS = obj => Object.keys(obj).reduce((result, key) => result + `${key}: ${obj[key]}; `, '')

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
      const position = this.state.position.slice()
      const speed = this.state.speed.slice()
      const acceleration = this.state.acceleration.slice()
      for (let dim = 0; dim < position.length; dim++) {
        speed[dim] += acceleration[dim]
        position[dim] += speed[dim]
      }
      // Bounce
      if (position[Y] > 200) {
        speed[Y] = -speed[Y] * 0.9
        speed[ROTATION] = -speed[ROTATION] * 0.9
        position[ROTATION] = position[ROTATION] * 0.9
        position[Y] = 200
      }
      const elapsedTime = Date.now() - this.state.timeStarted
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
