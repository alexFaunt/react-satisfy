const Component = require('react').Component

const omit = (items, target) => Object.keys(target)
 .reduce((result, prop) => {
   return items.includes(prop) ? result : Object.assign(result, [prop]: target[prop])
 })

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
  fire = (props) => {
    action(omit(['action', 'condition', 'children'], props))
  }
  render = () => null
}
