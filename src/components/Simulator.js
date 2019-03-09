import React, { Component, Fragment } from 'react'

import styled from 'styled-components'

import { X, Y, Z, ROTATION, OPACITY, TIME, SKEW, STRETCH, TIMER_INTERVAL } from '../common/constants'
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

const getStylesValues = (state, options = {}) => ({
  elapsedTime: state.elapsedTime,
  left: state.position[X],
  top: state.position[Y],
  transformScale: (1 - (state.position[Z] || 0.001) / 500),
  transformRotate: state.position[ROTATION],
  transformSkewX: state.speed[X],
  transformSkewY: state.speed[Y],
  transformStretchX: 1 + state.speed[X] / 40,
  transformStretchY: 1 + state.speed[Y] / 40,
  opacity: state.position[OPACITY]
})

export const transformStylesValues = (stylesValues, outputOptions, options = {}) => ({
  elapsedTime: stylesValues.elapsedTime * outputOptions.scale[TIME] / 100 + outputOptions.offset[TIME],
  left: stylesValues.left * outputOptions.scale[X] / 100 + outputOptions.offset[X],
  top: stylesValues.top * outputOptions.scale[Y] / 100 + outputOptions.offset[Y],
  transformScale: stylesValues.transformScale,
  transformRotate: stylesValues.transformRotate,
  transformSkewX: stylesValues.transformSkewX,
  transformSkewY: stylesValues.transformSkewY,
  transformStretchX: stylesValues.transformStretchX,
  transformStretchY: stylesValues.transformStretchY,
  opacity: stylesValues.opacity
})

export const getStylesCSS = (stylesValues, options) => ({
  left: `${roundTo3decimals(stylesValues.left)}px`,
  top: `${roundTo3decimals(stylesValues.top)}px`,
  transform: `scale(${roundTo3decimals(stylesValues.transformScale)})` +
    ` rotate(${roundTo3decimals(stylesValues.transformRotate)}deg)` +
    (options[SKEW] ? ` skew(${roundTo3decimals(stylesValues.transformSkewX)}deg, ${roundTo3decimals(stylesValues.transformSkewY)}deg)` : '') +
    (options[STRETCH] ? ` scale(${roundTo3decimals(stylesValues.transformStretchX)}, ${roundTo3decimals(stylesValues.transformStretchY)})` : ''),
  opacity: roundTo3decimals(stylesValues.opacity)
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
    this.timer = setInterval(this.onTimerUpdate.bind(this), this.props.options[TIMER_INTERVAL])
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
      const stylesValues = getStylesValues({ elapsedTime, position, speed, acceleration }, this.props.options)
      this.props.handleOutput({ position, speed, acceleration, elapsedTime, stylesValues, styles: getStylesCSS(stylesValues, this.props.options) })
    }
  }

  toggleRunning () {
    const isRunning = !this.state.isRunning
    this.setState({ isRunning })
    if (isRunning) {
      this.props.handleClearOutput()
      const timeStarted = Date.now()
      const { position, speed, acceleration } = Object.assign({}, this.props.startState)
      this.setState({ position, speed, acceleration, timeStarted })
    }
  }

  render () {
    return <Fragment>
      <SimulatorContainer>
        <TheBox style={getStylesCSS(getStylesValues(this.state, this.props.options), this.props.options)} />
      </SimulatorContainer>
      <p>
        <button onClick={this.toggleRunning.bind(this)}>{!this.state.isRunning ? 'Start' : 'Stop'}</button>
      </p>
    </Fragment>
  }
}
