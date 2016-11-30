'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Satisfy = function (_Component) {
  _inherits(Satisfy, _Component);

  function Satisfy() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Satisfy);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Satisfy.__proto__ || Object.getPrototypeOf(Satisfy)).call.apply(_ref, [this].concat(args))), _this), _this.fire = function (_ref2) {
      var action = _ref2.action,
          condition = _ref2.condition,
          children = _ref2.children,
          rest = _objectWithoutProperties(_ref2, ['action', 'condition', 'children']);

      action(rest);
    }, _this.render = function () {
      return null;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Satisfy, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      if (typeof this.props.condition === 'undefined' || !this.props.condition) this.fire(this.props);
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(_ref3) {
      var _this2 = this;

      var condition = _ref3.condition,
          children = _ref3.children,
          rest = _objectWithoutProperties(_ref3, ['condition', 'children']);

      return typeof this.props.condition === 'undefined' ? Object.keys(rest).some(function (prop) {
        return _this2.props[prop] !== rest[prop];
      }) : !condition;
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps) {
      this.fire(nextProps);
    }
  }]);

  return Satisfy;
}(_react.Component);

Satisfy.propTypes = {
  action: _react.PropTypes.func.isRequired
};
exports.default = Satisfy;
