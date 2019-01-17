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
  width: 10em;
  height: 5em;
  background-color: slateblue;
  border-radius: 0.5em;
`

const TIMER_INTERVAL = 50

const physicsInitialState = {
  // X, Y, Z, rotation
  position: [0, 0, 0, 0],
  speed: [0, 0, 0, 0],
  acceleration: [0, 2, 0, 0]
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
      const position = this.state.position.slice()
      const speed = this.state.speed.slice()
      const acceleration = this.state.acceleration.slice()
      for (let dim = 0; dim < position.length; dim++) {
        speed[dim] += acceleration[dim]
        position[dim] += speed[dim]
      }
      // Bounce
      if (position[1] > 200) {
        speed[1] = -speed[1] * 0.9
        position[1] = 200
      }
      const elapsedTime = Date.now() - this.state.timeStarted
      this.setState({ position, speed, acceleration, elapsedTime })
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
        <TheBox style={{
          left: `${this.state.position[0]}px`,
          top: `${this.state.position[1]}px`
        }} />
      </SimulatorContainer>
      <p>Time: {this.state.isRunning ? this.state.elapsedTime : '-'}</p>
      <button onClick={this.toggleRunning.bind(this)}>{!this.state.isRunning ? 'Start' : 'Stop'}</button>
    </Fragment>
  }
}
