const Component = require('react').Component

module.exports = class Satisfy extends Component {
  componentWillMount() {
    const condition = this.props.condtion
    if (typeof condition === 'undefined' || !condition) this.fire(this.props)
  }
  shouldComponentUpdate(nextProps) {
    const rest = omit(['condition', 'children'], nextProps)
    return typeof this.props.condtion === 'undefined'
      ? Object.keys(rest).some((prop) => this.props[prop] !== rest[prop])
      : !nextProps.condition
  }
  componentWillUpdate(nextProps) {
    this.fire(nextProps)
  }
  fire(props) {
    this.props.action(
      Object.keys(target).reduce((result, prop) => {
        if (['action', 'condition', 'children'].includes(prop)) return result
        return Object.assign(result, { [prop]: target[prop] })
      })
    )
  }
  render() {
    return null
  }
}
