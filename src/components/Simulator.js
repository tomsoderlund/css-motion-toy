import React, { Component, Fragment } from 'react'

import styled from 'styled-components'

const SimulatorContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 20em;
  height: 20em;
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

export default class Simulator extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isRunning: false,
      timeStarted: 0,
      elapsedTime: 0
    }
  }

  componentDidMount () {
    this.timer = setInterval(this.onTimerUpdate.bind(this), TIMER_INTERVAL)
  }

  componentWillUnmount () {
    clearInterval(this.timer)
  }

  onTimerUpdate () {
    const elapsedTime = Date.now() - this.state.timeStarted
    this.setState({ elapsedTime })
  }

  toggleRunning () {
    const isRunning = !this.state.isRunning
    this.setState({ isRunning })
    if (isRunning) {
      const timeStarted = Date.now()
      this.setState({ timeStarted })
    }
  }

  render () {
    return <Fragment>
      <SimulatorContainer>
        <TheBox />
      </SimulatorContainer>
      <br />
      Time: {this.state.isRunning ? this.state.elapsedTime : '-'}
      <button onClick={this.toggleRunning.bind(this)}>{!this.state.isRunning ? 'Start' : 'Stop'}</button>
    </Fragment>
  }
}
