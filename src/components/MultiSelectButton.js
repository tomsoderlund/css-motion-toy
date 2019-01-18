import React, { Component } from 'react'
import styled from 'styled-components'

const SelectButton = styled.button`
  min-width: auto;

  &:hover:not(:disabled),
  &:focus:not(:disabled) {
  }
  &:hover:not(:disabled) {
  }
  &:active:hover {
  }
  &.selected {
    border: 2px solid blue;
  }
`

export default class MultiSelectButton extends Component {
  constructor (props) {
    super(props)
    this.state = { selected: props.selected || props.options[0] }
  }

  handleSelect (option, event) {
    this.setState({ selected: option })
    if (this.props.onSelect) this.props.onSelect(option)
  }

  render () {
    return <span>
      { this.props.options.map(option => <SelectButton key={option} onClick={this.handleSelect.bind(this, option)} className={this.state.selected === option ? 'selected' : null}>{option}</SelectButton>) }
    </span>
  }
}
