import { Component } from 'react'

export default class Simulator extends Component {

  constructor (props) {
    super(props)
    this.state = { propName: 'this prop' }
  }

  render () {
    return <div>
      Simulator: {this.props.propName}
    </div>
  }

}
