import { Component, PropTypes } from 'react'

export default class Satisfy extends Component {
  static propTypes = {
    action: PropTypes.func.isRequired
  }
  componentWillMount() {
    if (typeof this.props.condition === 'undefined' || !this.props.condition) this.fire(this.props)
  }
  shouldComponentUpdate({ condition, children, ...rest }) {
    return typeof this.props.condition === 'undefined'
      ? Object.keys(rest).some((prop) => this.props[prop] !== rest[prop])
      : !condition
  }
  componentWillUpdate(nextProps) {
    this.fire(nextProps)
  }
  fire = ({ action, condition, children, ...rest }) => {
    action(rest)
  }
  render = () => null
}
